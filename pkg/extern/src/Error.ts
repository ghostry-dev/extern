/**
 * Every error this library throws is a subclass of {@link ExternError}, declared
 * in its namespace (`ExternError.NotMockedError`): `instanceof ExternError`
 * catches everything the library raises.
 *
 * A `name` is the package and the class, `"@ghostry/extern:NotMockedError"`, so
 * it identifies an error where `instanceof` cannot: across two installed copies
 * of this package, or after the error is serialized.
 *
 * @module
 */

import type { Spy } from "./Spy.ts";
import type { StandardSchemaV1 } from "./StandardSchema.ts";

/**
 * Base error class from which more specific errors inherit.
 */
export abstract class ExternError extends Error {
  constructor() {
    super();
    this.name = "@ghostry/extern:ExternError";
  }
}

export namespace ExternError {
  /**
   * The error thrown when an object is provided to `extern.validated` that does
   * not conform to the Standard Schema interface.
   */
  export class InvalidSchemaError extends ExternError {
    constructor() {
      super();
      this.name = "@ghostry/extern:InvalidSchemaError";
      this.message = "Expected an object that conforms to Standard Schema.";
    }
  }

  /**
   * The error thrown during an `extern.validated` block if the block function's
   * return value does not conform to the specified schema.
   */
  export class InvalidDataTypeError extends ExternError {
    constructor(
      /**
       * The schema the data was validated against.
       */
      public readonly schema: StandardSchemaV1,

      /**
       * The list of validation issues found.
       */
      public readonly issues: ReadonlyArray<StandardSchemaV1.Issue>,
    ) {
      super();
      this.name = "@ghostry/extern:InvalidDataTypeError";
      this.message = "Evaluated result did not match schema.";
    }
  }

  /**
   * The error thrown during concurrently executing `extern.testing` blocks when
   * the library has not been allowed execute them concurrently.
   */
  export class IllegalConcurrencyTestingError extends ExternError {
    constructor() {
      super();
      this.name = "@ghostry/extern:IllegalConcurrencyTestingError";
      this.message =
        "The current runtime does not support `node:async_hooks` (or the "
        + "library was specifically configured not to use it), so "
        + "concurrent testing is not allowed.  This error was thrown "
        + "because your test suite used `extern.testing()` concurrently "
        + "which cannot be deterministic in this situation.  To achieve "
        + "test concurrency with this runtime, spawn separate instances "
        + "to execute separate portions of the suite.";
    }
  }

  /**
   * The error thrown when `initialize({ scope: "async" })` runs on a runtime
   * whose `#scope` condition resolved to the synchronous carrier.
   *
   * That condition is `default`: anywhere without `node:async_hooks`, in
   * practice a browser bundle. Node, Bun, and Deno resolve `#scope` to the
   * `AsyncLocalStorage` carrier and never raise this. Omitting `scope` on a
   * synchronous runtime takes that carrier; naming `"async"` demands it, and a
   * demand this runtime cannot meet fails with this error.
   */
  export class AsyncScopeUnavailableError extends ExternError {
    constructor() {
      super();
      this.name = "@ghostry/extern:AsyncScopeUnavailableError";
      this.message =
        '`initialize({ scope: "async" })` requires `node:async_hooks`, and this '
        + "runtime has none — `#scope` resolved to the synchronous carrier. Omit "
        + '`scope`, or pass `scope: "sync"`.';
    }
  }

  /**
   * The error thrown when a mock is defined with the same schema and
   * disambiguation as a previously defined mock.
   */
  export class DuplicateMockError extends ExternError {
    constructor() {
      super();
      this.name = "@ghostry/extern:DuplicateMockError";
      this.message = "Schema with this disambiguation has already been mocked.";
    }
  }

  /**
   * The error thrown during an `extern.testing` block when an extern block has
   * not been mocked.
   */
  export class NotMockedError extends ExternError {
    constructor() {
      super();
      this.name = "@ghostry/extern:NotMockedError";
      this.message =
        "A code path using `extern` was not mocked. During an `extern.testing` "
        + "block, all tested code paths using `extern` must be mocked.";
    }
  }

  /**
   * The error thrown when a mocker is reached outside any testing block.
   *
   * Reachable only through `@ghostry/extern/harnessing`, whose integration
   * frames tests but not suite hooks: a mock defined in `beforeAll` could never
   * reach a test, since every testing block mints its own spies. Refusing at
   * the call is what keeps that from being a silent no-op.
   */
  export class MockingUnavailableError extends ExternError {
    constructor() {
      super();
      this.name = "@ghostry/extern:MockingUnavailableError";
      this.message =
        "`context.extern.mock` is available inside a test only. `beforeAll` and "
        + "`afterAll` run outside any `extern.testing` block, so a mock defined "
        + "there could never reach a test. Define it in the test, or in "
        + "`beforeEach`, which runs inside the block; to use extern within the "
        + "hook itself, open a block explicitly with `extern.testing(...)`.";
    }
  }

  /**
   * The error thrown when a block whose identity an extension claims would need
   * to produce a value, but no extension able to produce it is available.
   *
   * Unreachable through the public types: `produce()` only appears on the
   * interface `mock()` returns for identities an extension's lambda accepts,
   * which requires that extension to have been passed to `initialize()` in the
   * first place. A plain JavaScript consumer has no such guard, so this stays a
   * real runtime error rather than an assertion.
   */
  export class ExtensionUnavailableError extends ExternError {
    constructor() {
      super();
      this.name = "@ghostry/extern:ExtensionUnavailableError";
      this.message =
        "A block needed an extension to produce a value, but no configured "
        + "extension recognizes its identity. Pass the extension to "
        + "`initialize({ extensions: [...] })`, or provide an explicit mock "
        + "for this block.";
    }
  }

  /**
   * The error thrown when more than one configured extension recognizes the
   * same identity.
   *
   * Refused rather than resolved by order. When two lambdas both match an
   * identity, TypeScript picks which one determines the block's type by its own
   * inference-candidate selection — not by the order the extensions were passed
   * in — so no runtime dispatch rule can be guaranteed to agree with the type
   * the caller was handed. Erroring at the point of use is the only outcome
   * that cannot silently disagree.
   */
  export class AmbiguousIdentityError extends ExternError {
    constructor(
      /**
       * The names of the extensions that each claimed the identity.
       */
      public readonly extensions: ReadonlyArray<string>,
    ) {
      super();
      this.name = "@ghostry/extern:AmbiguousIdentityError";
      this.message =
        `More than one extension recognizes this identity: `
        + `${extensions.join(", ")}. Extensions must claim disjoint sets of `
        + `identities — an overlap has no well-defined produced type.`;
    }
  }

  /**
   * The error thrown when one or more extension scopes failed to tear down.
   *
   * Carries every failure rather than the first: cleanups settle
   * innermost-first and one throwing does not stop its siblings, so reporting
   * only one would hide the rest. A named error rather than an `AggregateError`
   * because this library targets ES2019, and because a structured `errors` list
   * matches how every other error here carries its detail.
   *
   * Thrown only when the testing block itself passed. When the block failed,
   * its own error is the one worth reading, so this is logged instead and the
   * block's error propagates untouched.
   */
  export class CleanupFailedError extends ExternError {
    constructor(
      /**
       * Each failure, innermost scope first.
       */
      public readonly errors: ReadonlyArray<unknown>,
    ) {
      super();
      this.name = "@ghostry/extern:CleanupFailedError";

      const details = errors
        .map((error, i) => `${i + 1}:\n${String(error)}`)
        .join("\n\n");

      this.message =
        `${errors.length} extension scope cleanup(s) threw while tearing down `
        + `a testing block:\n\n${details}`;
    }
  }

  /**
   * The error thrown at the end of an `extern.testing` block if there were any
   * mocks defined that were never used.
   */
  export class UnusedMocksError extends ExternError {
    constructor(
      /**
       * The list of mocks that were found to not be used.
       */
      unused: ReadonlyArray<Spy>,
    ) {
      super();
      this.name = "@ghostry/extern:UnusedMocksError";

      const details = unused
        .map(({ stack }, i) => `${i + 1}:\n${stack}`)
        .join("\n\n");

      this.message =
        `The testing block defined ${unused.length} mocks that did not get used:`
        + `\n\n${details}`;
    }
  }

  /**
   * The error thrown when an extension's `frame` returns something that is not
   * a generator.
   *
   * The likeliest cause is a frame written as a plain function — one that
   * establishes a session and returns it, or that returns teardown. Either runs
   * its setup and then silently never tears down, so refusing is what keeps a
   * suite from passing with teardown quietly skipped.
   */
  export class ExtensionFrameResultError extends ExternError {
    constructor(public readonly extension: string) {
      super();
      this.name = "@ghostry/extern:ExtensionFrameResultError";
      this.message =
        `The \`frame\` of extension ${JSON.stringify(extension)} did not return `
        + `a generator. Declare it as \`*frame()\` or \`async *frame()\`: `
        + `everything before the \`yield\` is setup, everything after it is `
        + `teardown.`;
    }
  }

  /**
   * The error thrown when an extension's `frame` yields something that is
   * neither a session nor a wrapper.
   *
   * A yield is how the frame hands extern what it established, so a value of
   * the wrong shape means the block would run without the session the author
   * believed they had supplied.
   */
  export class ExtensionFrameSessionError extends ExternError {
    constructor(
      public readonly extension: string,
      public readonly received: string,
    ) {
      super();
      this.name = "@ghostry/extern:ExtensionFrameSessionError";
      this.message =
        `The \`frame\` of extension ${JSON.stringify(extension)} yielded a `
        + `${received}. Yield either the session object, or a wrapper `
        + `\`(body) => …\` that runs \`body(session)\` inside whatever the `
        + `extension opens.`;
    }
  }

  /**
   * The error thrown when an extension's `frame` yields a second time.
   *
   * There is one testing block per scope, so there is one suspension point. A
   * second `yield` has no body to run at, and treating it as teardown would run
   * the author's remaining code at a moment they never intended.
   */
  export class ExtensionFrameYieldError extends ExternError {
    constructor(public readonly extension: string) {
      super();
      this.name = "@ghostry/extern:ExtensionFrameYieldError";
      this.message =
        `The \`frame\` of extension ${JSON.stringify(extension)} yielded more `
        + `than once. A frame has exactly one \`yield\`: the block runs there, `
        + `and everything after it is teardown.`;
    }
  }
}

/**
 * The same classes as top-level exports, from before they moved into the
 * `ExternError` namespace. Each is the namespace's class itself, so
 * `instanceof` and `catch` work with either.
 */

/** @deprecated Use {@link ExternError.InvalidSchemaError}. */
export const InvalidSchemaError: typeof ExternError.InvalidSchemaError =
  ExternError.InvalidSchemaError;
/** @deprecated Use {@link ExternError.InvalidSchemaError}. */
export type InvalidSchemaError = ExternError.InvalidSchemaError;

/** @deprecated Use {@link ExternError.InvalidDataTypeError}. */
export const InvalidDataTypeError: typeof ExternError.InvalidDataTypeError =
  ExternError.InvalidDataTypeError;
/** @deprecated Use {@link ExternError.InvalidDataTypeError}. */
export type InvalidDataTypeError = ExternError.InvalidDataTypeError;

/** @deprecated Use {@link ExternError.IllegalConcurrencyTestingError}. */
export const IllegalConcurrencyTestingError: typeof ExternError.IllegalConcurrencyTestingError =
  ExternError.IllegalConcurrencyTestingError;
/** @deprecated Use {@link ExternError.IllegalConcurrencyTestingError}. */
export type IllegalConcurrencyTestingError =
  ExternError.IllegalConcurrencyTestingError;

/** @deprecated Use {@link ExternError.AsyncScopeUnavailableError}. */
export const AsyncScopeUnavailableError: typeof ExternError.AsyncScopeUnavailableError =
  ExternError.AsyncScopeUnavailableError;
/** @deprecated Use {@link ExternError.AsyncScopeUnavailableError}. */
export type AsyncScopeUnavailableError = ExternError.AsyncScopeUnavailableError;

/** @deprecated Use {@link ExternError.DuplicateMockError}. */
export const DuplicateMockError: typeof ExternError.DuplicateMockError =
  ExternError.DuplicateMockError;
/** @deprecated Use {@link ExternError.DuplicateMockError}. */
export type DuplicateMockError = ExternError.DuplicateMockError;

/** @deprecated Use {@link ExternError.NotMockedError}. */
export const NotMockedError: typeof ExternError.NotMockedError =
  ExternError.NotMockedError;
/** @deprecated Use {@link ExternError.NotMockedError}. */
export type NotMockedError = ExternError.NotMockedError;

/** @deprecated Use {@link ExternError.MockingUnavailableError}. */
export const MockingUnavailableError: typeof ExternError.MockingUnavailableError =
  ExternError.MockingUnavailableError;
/** @deprecated Use {@link ExternError.MockingUnavailableError}. */
export type MockingUnavailableError = ExternError.MockingUnavailableError;

/** @deprecated Use {@link ExternError.ExtensionUnavailableError}. */
export const ExtensionUnavailableError: typeof ExternError.ExtensionUnavailableError =
  ExternError.ExtensionUnavailableError;
/** @deprecated Use {@link ExternError.ExtensionUnavailableError}. */
export type ExtensionUnavailableError = ExternError.ExtensionUnavailableError;

/** @deprecated Use {@link ExternError.AmbiguousIdentityError}. */
export const AmbiguousIdentityError: typeof ExternError.AmbiguousIdentityError =
  ExternError.AmbiguousIdentityError;
/** @deprecated Use {@link ExternError.AmbiguousIdentityError}. */
export type AmbiguousIdentityError = ExternError.AmbiguousIdentityError;

/** @deprecated Use {@link ExternError.CleanupFailedError}. */
export const CleanupFailedError: typeof ExternError.CleanupFailedError =
  ExternError.CleanupFailedError;
/** @deprecated Use {@link ExternError.CleanupFailedError}. */
export type CleanupFailedError = ExternError.CleanupFailedError;

/** @deprecated Use {@link ExternError.UnusedMocksError}. */
export const UnusedMocksError: typeof ExternError.UnusedMocksError =
  ExternError.UnusedMocksError;
/** @deprecated Use {@link ExternError.UnusedMocksError}. */
export type UnusedMocksError = ExternError.UnusedMocksError;

/** @deprecated Use {@link ExternError.ExtensionFrameResultError}. */
export const ExtensionFrameResultError: typeof ExternError.ExtensionFrameResultError =
  ExternError.ExtensionFrameResultError;
/** @deprecated Use {@link ExternError.ExtensionFrameResultError}. */
export type ExtensionFrameResultError = ExternError.ExtensionFrameResultError;

/** @deprecated Use {@link ExternError.ExtensionFrameSessionError}. */
export const ExtensionFrameSessionError: typeof ExternError.ExtensionFrameSessionError =
  ExternError.ExtensionFrameSessionError;
/** @deprecated Use {@link ExternError.ExtensionFrameSessionError}. */
export type ExtensionFrameSessionError = ExternError.ExtensionFrameSessionError;

/** @deprecated Use {@link ExternError.ExtensionFrameYieldError}. */
export const ExtensionFrameYieldError: typeof ExternError.ExtensionFrameYieldError =
  ExternError.ExtensionFrameYieldError;
/** @deprecated Use {@link ExternError.ExtensionFrameYieldError}. */
export type ExtensionFrameYieldError = ExternError.ExtensionFrameYieldError;
