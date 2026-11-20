/**
 * This package's test surface: `bun:test` wrapped by `@ghostry/harness`, which
 * every test file imports instead of `bun:test` itself.
 *
 * No integrations. Extern is the subject under test here, so each test builds
 * the instance it asserts on with `initialize()`. The tests of extern's own
 * harness integration build their harness around a recording stand-in.
 *
 * `expectTypeOf` and `spyOn` are re-exported as they are: harness wraps only
 * the parts of a runner that register tests and hooks.
 *
 * @module
 */

import { initialize, type Attest } from "@ghostry/harness";
import * as framework from "bun:test";

const harness = initialize({ framework });

export const { describe, expect, it, test } = harness;

/**
 * Annotated, because an assertion narrows only through a binding whose type is
 * written out; a destructure never qualifies (TS2775).
 */
export const attest: Attest = harness.attest;

export { expectTypeOf, spyOn } from "bun:test";
