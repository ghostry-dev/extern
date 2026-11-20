import { initialize as initializeExtern } from "@ghostry/extern";
import { initialize as initializeFabricator } from "@ghostry/fabricator";
import { fabricatorExtension } from "../src/index.ts";
import { expect, test } from "./index.ts";

/**
 * The README's Example, executed as written. The README imports this package by
 * name and `bun:test`; here they are the source and the test wrapper. Its
 * `declare function fetchUser()` becomes a function that throws, so the test
 * fails if a block ever runs it instead of fabricating. Every other line is the
 * README's. Change the README and this file together.
 */

const fabricator = initializeFabricator();
const { T } = fabricator;

const extern = initializeExtern({
  extensions: [fabricatorExtension({ instance: fabricator })],
});

const User = T.object({
  id: T.number,
  name: T.string.whereby({ length: { max: 10 } }),
});

function fetchUser(): { id: number; name: string } {
  throw new Error("the original function must not run under test");
}
const loadUser = () => extern.typed.by(User).will(() => fetchUser());

test("fabricates a user with no mock", async () => {
  await extern.testing(() => {
    expect(loadUser()).toMatchObject({ id: expect.any(Number) });
  });
});
