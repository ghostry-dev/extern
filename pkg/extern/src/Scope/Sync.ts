import type { Context } from "../Context.ts";
import { ExternError } from "../Error.ts";
import type { Scope } from "../Scope.ts";
import { isThenable } from "../Util.ts";

/**
 * The synchronous carrier: one context at a time, cleared when the block
 * settles.
 *
 * `scope: "sync"` imports this file directly, so forcing the synchronous
 * carrier never loads `node:async_hooks`. The `#scope` `default` condition
 * (`package.json`) selects it too, on any runtime without that module — in
 * practice a browser bundle.
 *
 * One shared slot cannot represent two overlapping blocks, which is why `run`
 * throws {@link ExternError.IllegalConcurrencyTestingError} when one is already
 * open. An async body is still accepted: the context stays until the returned
 * promise settles, and a second block started during that wait is the overlap
 * that this carrier refuses.
 */
export const toScope = (): Scope => new SyncScope();

class SyncScope implements Scope {
  public readonly asynchronous = false;

  private context: Context | undefined = undefined;

  public readonly current = () => {
    return this.context;
  };

  public readonly run = <$Return>(
    context: Context,
    fn: () => $Return,
  ): $Return => {
    /**
     * Thrown synchronously so it surfaces at the `testing` call site rather
     * than inside a promise, matching fabricator's reasoning for
     * `SynchronousStackError`. Nothing has started, so no promise is
     * abandoned.
     */
    if (this.context !== undefined) {
      throw new ExternError.IllegalConcurrencyTestingError();
    }

    this.context = context;

    let result: $Return | undefined;

    try {
      result = fn();
    } finally {
      if (!isThenable(result)) {
        this.context = undefined;
      }
    }

    if (isThenable(result)) {
      return result.then(
        (value) => {
          this.context = undefined;
          return value;
        },
        (error: unknown) => {
          this.context = undefined;
          throw error;
        },
      ) as $Return;
    }

    return result;
  };
}
