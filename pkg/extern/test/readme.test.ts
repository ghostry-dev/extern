import { initialize } from "../src/index.ts";
import { expect, test } from "./index.ts";

/**
 * The README's Example, executed as written. The README imports
 * `@ghostry/extern` and `bun:test`; here they are this package's source and its
 * test wrapper. Every other line is the README's, so an example that stops
 * being true stops passing. Change the README and this file together.
 *
 * No request is ever made: the testing block mocks `User`, so `fetch` is never
 * reached.
 */

const extern = initialize();

type User = { id: number; name: string };
export const User = extern.T<User>();

// Source: the call is wrapped where it happens, and the signature is unchanged.
export const loadUser = (id: number) =>
  extern.typed
    .by(User)
    .given(id)
    .will(async (id) => {
      const response = await fetch(`https://api.example.com/users/${id}`);
      return (await response.json()) as User;
    });

// Test: no request is made, and the spy records the call.
test("loads a user", async () => {
  await extern.testing(async (mock) => {
    const spy = mock(User).with({ id: 1, name: "Ada" });

    expect((await loadUser(1)).name).toBe("Ada");
    expect(spy.executions[0]?.given).toBe(1);
  });
});
