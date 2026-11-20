import { expect, test } from "./index.ts";
import * as S from "sury";
import * as Exports from "../src/index.ts";
import { ExternError } from "../src/index.ts";

/**
 * Every error's `name` is `"@ghostry/extern:<class>"`, so it identifies the
 * error where `instanceof` cannot. Each class is constructed directly, since
 * reaching some of them takes a runtime without `node:async_hooks` or a
 * misbehaving extension.
 */
const errors: ReadonlyArray<readonly [string, ExternError]> = [
  ["InvalidSchemaError", new ExternError.InvalidSchemaError()],
  ["InvalidDataTypeError", new ExternError.InvalidDataTypeError(S.string, [])],
  [
    "IllegalConcurrencyTestingError",
    new ExternError.IllegalConcurrencyTestingError(),
  ],
  ["AsyncScopeUnavailableError", new ExternError.AsyncScopeUnavailableError()],
  ["DuplicateMockError", new ExternError.DuplicateMockError()],
  ["NotMockedError", new ExternError.NotMockedError()],
  ["MockingUnavailableError", new ExternError.MockingUnavailableError()],
  ["ExtensionUnavailableError", new ExternError.ExtensionUnavailableError()],
  [
    "AmbiguousIdentityError",
    new ExternError.AmbiguousIdentityError(["a", "b"]),
  ],
  [
    "CleanupFailedError",
    new ExternError.CleanupFailedError([new Error("teardown")]),
  ],
  ["UnusedMocksError", new ExternError.UnusedMocksError([])],
  ["ExtensionFrameResultError", new ExternError.ExtensionFrameResultError("a")],
  [
    "ExtensionFrameSessionError",
    new ExternError.ExtensionFrameSessionError("a", "number"),
  ],
  ["ExtensionFrameYieldError", new ExternError.ExtensionFrameYieldError("a")],
];

test.each(errors)(
  "%s is named with the package prefix",
  ({ row: [name, error] }) => {
    expect(error).toBeInstanceOf(ExternError);
    expect(error.name).toBe(`@ghostry/extern:${name}`);
    expect(error.constructor.name).toBe(name);
  },
);

test("every subclass in the namespace is covered", () => {
  expect(errors.map(([name]) => name).sort()).toEqual(
    Object.keys(ExternError).sort(),
  );
});

test("each top-level export is the namespace's class itself", () => {
  const flat = Exports as unknown as Record<string, unknown>;
  const namespace = ExternError as unknown as Record<string, unknown>;

  for (const name of Object.keys(ExternError)) {
    expect(flat[name]).toBe(namespace[name]);
  }
});
