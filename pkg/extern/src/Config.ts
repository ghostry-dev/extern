import { toScope as resolvedScope } from "#scope";
import { AsyncScopeUnavailableError } from "./Error.ts";
import { compose, type Extension, type Extensions } from "./Extension.ts";
import type { Scope } from "./Scope.ts";
import { toScope as syncScope } from "./Scope/Sync.ts";

/**
 * The available configurations for this library.
 */
export interface Configuration<
  $Extensions extends readonly Extension.Any[] = readonly Extension.Any[],
> {
  /**
   * Forces a specific execution scope for tests.
   *
   * Left unset, the `#scope` package import picks the carrier. Every runtime
   * with `node:async_hooks` — Node, Bun, and Deno — gets the
   * `AsyncLocalStorage` carrier, whose frames survive `await` and isolate
   * concurrent `testing` blocks. Anywhere else resolves to the synchronous
   * carrier.
   *
   * `async` demands that carrier and throws {@link AsyncScopeUnavailableError}
   * when this runtime resolved to the synchronous one.
   *
   * `sync` forces the synchronous carrier. It has no execution-environment
   * requirements, and it prevents tests using `extern.testing` from running
   * concurrently.
   *
   * @default undefined
   */
  readonly scope?: "async" | "sync";

  /**
   * Extensions that widen what this instance accepts as a block identity, so
   * that a `typed` block built from an extension's own schema can produce a
   * value in place of an explicit mock.
   *
   * The widening applies to this instance alone. Each extension's type lambda
   * joins the union that `Identity` is resolved against, which is why passing
   * them as values — rather than registering them globally — keeps instances
   * that did not opt in unaffected.
   *
   * @default [ ]
   */
  readonly extensions?: $Extensions;
}

export interface Config {
  readonly scope: Scope;
  readonly extensions: Extensions;
}

export const fromConfiguration = (configuration: Configuration): Config => {
  return {
    scope: $scope(configuration),
    extensions: compose(configuration.extensions ?? []),
  };
};

/**
 * One carrier per `initialize()`. Two instances must not share a synchronous
 * slot: a testing block on one would then look like concurrency to the other.
 */
const $scope = (configuration: Configuration): Scope => {
  switch (configuration.scope) {
    case "async": {
      const scope = resolvedScope();

      if (!scope.asynchronous) throw new AsyncScopeUnavailableError();

      return scope;
    }
    case "sync":
      return syncScope();
    case undefined:
      return resolvedScope();
    default:
      throw new Error(
        `Invalid configuration option for scope: ${configuration.scope}`,
      );
  }
};
