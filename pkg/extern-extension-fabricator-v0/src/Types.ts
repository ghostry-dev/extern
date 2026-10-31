import type { HandleLambda, TypeLambda } from "@ghostry/extern";
import type {
  AsFabricator,
  Kind,
  Meta,
  Produced,
  Produces,
} from "@ghostry/fabricator/internal";

/**
 * A raw fabricator Schema producing `$T`.
 *
 * Keyed on fabricator's own branded symbols rather than on shape. A lambda
 * emitting something as loose as `{ fabricate: () => $T }` would accept any
 * object with a same-named method and silently claim identities that were never
 * fabricator's. So this satisfies the structural-narrowness rule that extern's
 * contract documents for lambda authors.
 *
 * `$T` is inferred through fabricator's own box, `Produced<$T>`, which is what
 * `[Produces]` holds. The brand is an optional property, and a caller compiling
 * without `exactOptionalPropertyTypes` reads one as `X | undefined`. Matched as
 * a bare `[Produces]?: $T`, a schema's own `undefined` is absorbed into that
 * optional slot: an identity of `T.undefinable(row)` infers `Row`, and a block
 * returning `undefined` is rejected. Inside the box it is out of the modifier's
 * reach, so the inference is the same under either setting.
 *
 * Never a built Fabricator. Given one, a block could either continue that
 * Fabricator's streams or build afresh from its schema in the testing block's
 * scope, and nothing at the call site says which. `fabricate?: never` is what
 * keeps one out: a Fabricator carries `[Kind]` and `[Meta]` too, and lacking
 * the optional `[Produces]` does not stop it matching — the trap fabricator's
 * own `fabricate` type closes the same way.
 */
export type Schema<$T> = {
  readonly [Kind]: unknown;
  readonly [Meta]: unknown;
  readonly [Produces]?: Produced<$T>;
  readonly fabricate?: never;
};

/**
 * What `mock(schema).produce(({ via }) => …)` hands the caller: the built
 * Fabricator for this identity.
 *
 * `AsFabricator` is fabricator's own schema -> Fabricator mapping, so the
 * handle is whatever that kind actually builds to — an object Fabricator whose
 * `fabricate(overrides?)` carries `Override<$Definition>`, an array's, a
 * string's, and so on. Nothing is re-derived here, and it stays correct for
 * free as fabricator's own API grows.
 */
export type HandleFor<$Of> = AsFabricator<$Of>;

/**
 * The type-level function this extension contributes.
 *
 * `In`/`Out` widens `Identity` so a fabricator schema is accepted where a block
 * identity is expected; `Of`/`Handle` says what a `produce()` callback receives
 * for a given one. The two pairs are independent, which is why `HandleLambda`
 * is a separate interface to extend rather than more slots on `TypeLambda` —
 * see extern's own note there.
 */
export interface FabricatorLambda extends TypeLambda, HandleLambda {
  readonly Out: Schema<this["In"]>;
  readonly Handle: HandleFor<this["Of"]>;
}
