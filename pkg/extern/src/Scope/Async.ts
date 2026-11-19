import { AsyncLocalStorage } from "node:async_hooks";
import type { Context } from "../Context.ts";
import type { Scope } from "../Scope.ts";

/**
 * The asynchronous carrier, and the **only** module in this package importing
 * anything from `node:`. Nothing imports it directly: `Config.ts` imports
 * `#scope`, whose `node`/`bun` conditions (`package.json`) resolve here while
 * `default` resolves to `./Sync.ts`. That is what keeps the package importable
 * on a runtime with no `node:async_hooks` while every runtime that has one gets
 * async-safe `testing` with nothing to configure. Deno reaches this file both
 * ways it can install the package: from npm through the `node` condition (built
 * output, under `dist/`), and from JSR through `jsr.json`'s import map, which
 * resolves `#scope` here when the package is published. A `deno` condition in
 * `package.json` would serve both, but npm ships no `src/`.
 *
 * `AsyncLocalStorage.run` returns whatever `fn` returns, so a synchronous
 * testing body stays synchronous whichever carrier is in play.
 */
export const toScope = (): Scope => new AsyncScope();

class AsyncScope implements Scope {
  public readonly asynchronous = true;

  private readonly store = new AsyncLocalStorage<Context | undefined>({
    defaultValue: undefined,
  });

  public readonly current = () => {
    return this.store.getStore();
  };

  public readonly run = <$Return>(
    context: Context,
    fn: () => $Return,
  ): $Return => {
    return this.store.run(context, fn);
  };
}
