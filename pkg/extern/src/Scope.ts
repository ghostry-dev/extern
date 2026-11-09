import type { Context } from "./Context";

/**
 * The carrier behind `extern.testing`.
 *
 * `asynchronous` is `true` for the `AsyncLocalStorage` carrier and `false` for
 * the synchronous one. `initialize({ scope: "async" })` reads it so a runtime
 * whose `#scope` condition resolved to the synchronous carrier fails instead of
 * quietly running without the isolation that was requested.
 *
 * The `#scope` import condition in `package.json` determines which
 * implementation loads, so this module imports nothing from `node:`.
 */
export interface Scope {
  readonly asynchronous: boolean;

  readonly current: () => Context | undefined;

  readonly run: <$Return>(context: Context, fn: () => $Return) => $Return;
}
