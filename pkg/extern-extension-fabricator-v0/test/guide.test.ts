import { describe, expect, it } from "./index.ts";
import { initialize as initializeExtern, ExternError } from "@ghostry/extern";
import { initialize as initializeFabricator } from "@ghostry/fabricator";
import { fabricatorExtension } from "../src/index.ts";

/**
 * The snippets of fabricator's "Extern" guide
 * (`docs/src/pages/fabricator/guides/extern.mdx`), executed as written, under
 * that guide's section names. Only the surrounding plumbing is added — every
 * line the guide shows appears here unchanged, so a snippet that stops being
 * true stops passing. Change the guide and this file together.
 */

// --- "Setup" ---------------------------------------------------------------

const fabricator = initializeFabricator({ salt: "my-suite" });

const extern = initializeExtern({
  extensions: [fabricatorExtension({ instance: fabricator })],
});

// --- "Using it" ------------------------------------------------------------

const { T } = fabricator;

const user = T.object({
  id: T.number,
  name: T.string.whereby({ length: { max: 10 } }),
});

type User = { id: number; name: string };

const fetchUser = (): User => {
  throw new Error("the original function must not run under test");
};

const load = () => extern.typed.by(user).will(() => fetchUser());

describe("the Extern guide", () => {
  it("fabricates with no mock written", async () => {
    await extern.testing(() => {
      expect(load()).toMatchObject({ id: expect.any(Number) });
    });
  });

  it("overrides outright with `with()`", async () => {
    await extern.testing((mock) => {
      mock(user).with({ id: 1, name: "Ada" });

      expect(load()).toEqual({ id: 1, name: "Ada" });
    });
  });

  it("shapes the fabrication through `produce`", async () => {
    await extern.testing((mock) => {
      mock(user).produce(({ via }) => via.fabricate({ name: "Ada" }));

      expect(load().name).toBe("Ada");
    });
  });

  it("offers the callback on a non-object schema too", async () => {
    const count = T.number;

    await extern.testing((mock) => {
      mock(count).produce(({ via }) => via.fabricate());

      expect(extern.typed.by(count).will((): number => 0)).toEqual(
        expect.any(Number),
      );
    });
  });

  it('restores throwing under `unmocked: "error"`', async () => {
    const strict = initializeExtern({
      extensions: [
        fabricatorExtension({ instance: fabricator, unmocked: "error" }),
      ],
    });

    const strictLoad = () => strict.typed.by(user).will(() => fetchUser());

    await strict.testing(() => {
      expect(strictLoad).toThrowError(ExternError.NotMockedError);
    });

    await strict.testing((mock) => {
      mock(user).produce();
      expect(strictLoad()).toMatchObject({ id: expect.any(Number) });
    });
  });

  describe("the determinism claims", () => {
    it("fabricates the same value across independent `testing()` calls", async () => {
      let first: User | undefined;
      let second: User | undefined;

      await extern.testing(() => void (first = load()));
      await extern.testing(() => void (second = load()));

      expect(first).toEqual(second!);
    });

    it("treats an ambient construction as a separate draw", async () => {
      await extern.testing(() => {
        const fromBlock = load();
        const ambient = new fabricator.Fabricator(user).fabricate();

        expect(ambient).not.toEqual(fromBlock);
      });
    });

    it("makes two blocks over one schema a single production", async () => {
      await extern.testing(() => {
        expect(load()).toEqual(load());
      });
    });

    it("distinguishes them once they are `named`", async () => {
      const namedLoad = (name: string) =>
        extern.typed
          .by(user)
          .named(name)
          .will(() => fetchUser());

      await extern.testing(() => {
        expect(namedLoad("a")).not.toEqual(namedLoad("b"));
      });
    });
  });
});
