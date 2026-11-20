import { describe, expect, expectTypeOf, it } from "../index.ts";
import * as S from "sury";
import { initialize } from "../../src/index.ts";
import { ExternError } from "../../src/Error.ts";
import { isThenable } from "../../src/Util.ts";

describe("`extern.testing` shape", () => {
  describe.each([{ scope: "async" as const }, { scope: "sync" as const }])(
    'with `scope: "$scope"`',
    ({ row: { scope } }) => {
      const extern = initialize({ scope });
      const schema = S.number;

      it("returns a sync body synchronously", () => {
        let seen = false;

        const result = extern.testing(() => {
          seen = true;
        });

        expect(isThenable(result)).toBe(false);
        expect(seen).toBe(true);
      });

      it("passes a sync body's return value through unchanged", () => {
        const sentinel = { ok: true };

        const result = extern.testing(() => sentinel);

        expectTypeOf(result).toEqualTypeOf<typeof sentinel>();
        expect(result).toBe(sentinel);
      });

      it("returns a promise whose resolved value is the async body's", async () => {
        const sentinel = { ok: true };

        const result = extern.testing(async () => sentinel);

        expectTypeOf(result).toEqualTypeOf<Promise<typeof sentinel>>();
        expect(isThenable(result)).toBe(true);
        await expect(result).resolves.toBe(sentinel);
      });

      it("runs the unused-mock check at settlement for an async body", async () => {
        await expect(
          extern.testing(async (mock) => {
            mock(schema).with(1);
          }),
        ).rejects.toThrowError(ExternError.UnusedMocksError);
      });

      it("propagates a sync throw from the body synchronously, without an unused-mock error", () => {
        const boom = new Error("boom");

        expect(() =>
          extern.testing((mock) => {
            mock(schema).with(1);
            throw boom;
          }),
        ).toThrowError(boom);
      });
    },
  );

  describe('with `scope: "sync"`', () => {
    it("allows a sync body nested in a second instance's testing block", async () => {
      const outer = initialize({ scope: "sync" });
      const inner = initialize({ scope: "sync" });
      let seen = false;

      outer.testing(() => {
        inner.testing(() => {
          seen = true;
        });
      });

      expect(seen).toBe(true);
    });

    it("throws when nesting `testing` on the same instance", async () => {
      const extern = initialize({ scope: "sync" });

      expect(() => {
        extern.testing(() => {
          extern.testing(() => {});
        });
      }).toThrowError(ExternError.IllegalConcurrencyTestingError);
    });
  });
});
