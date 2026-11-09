import { expect, it } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/esm/", import.meta.url).pathname;
const TYPES = new URL("../dist/types/", import.meta.url).pathname;

function walk(dir: string, extension: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full, extension);
    return full.endsWith(extension) ? [full] : [];
  });
}

/**
 * Every `from "…"` in the emitted output whose specifier is neither relative
 * nor a `#` subpath import — i.e. everything the package expects the host to
 * provide.
 */
function externalImports(source: string): string[] {
  /**
   * `\s+`, not `\s*`: ESM `from` specifiers always have whitespace before the
   * quote (`from "async_hooks"`).
   */
  return [...source.matchAll(/\bfrom\s+"([^"]+)"/g)]
    .map((match) => match[1]!)
    .filter(
      (specifier) => !specifier.startsWith(".") && !specifier.startsWith("#"),
    );
}

/**
 * The package must stay importable on a runtime with no `node:async_hooks` —
 * that is the whole premise of `#scope`'s `default` condition resolving to the
 * synchronous carrier (`Scope/Sync.ts`). A `node:` import anywhere else in the
 * graph would break that silently: the failure is a module-load error in
 * someone else's browser bundle, which no test here would otherwise catch.
 *
 * Asserted against built output rather than source because that is what ships,
 * and because rslib rewrites the specifier on the way out — `node:async_hooks`
 * is emitted as a bare `async_hooks`, which Node and Bun both resolve to the
 * builtin. Deno, which does require the prefix, is served `src/` by its own
 * `#scope` condition and never reads this file.
 */
it("only the async carrier imports anything the host has to provide", () => {
  const offenders = walk(DIST, ".js")
    .map(
      (file) =>
        [
          file.slice(DIST.length),
          externalImports(readFileSync(file, "utf8")),
        ] as const,
    )
    .filter(([, imports]) => imports.length > 0);

  expect(Object.fromEntries(offenders)).toEqual({
    "Scope/Async.js": ["async_hooks"],
  });
});

/**
 * `#scope`'s `types` condition points at source, which the npm tarball does not
 * ship. A declaration that imports the specifier would fail to resolve for
 * every consumer of the published types.
 */
it("emits no declaration that imports `#scope`", () => {
  const offenders = walk(TYPES, ".d.ts").filter((file) =>
    readFileSync(file, "utf8").includes('from "#scope"'),
  );

  expect(offenders).toEqual([]);
});
