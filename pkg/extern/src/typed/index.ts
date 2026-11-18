import type { Config } from "../Config.ts";
import type { TypeLambda } from "../Extension.ts";
import type { Identity } from "../Types.ts";
import { by, type By } from "./by/index.ts";

/**
 * `$Lambda` carries this instance's extensions, widening what `by()` accepts as
 * an identity — see {@link Identity}.
 */
export interface Typed<$Lambda extends TypeLambda = never> {
  by: <$Out>(identity: Identity<$Out, $Lambda>) => By<$Out>;
}

export const typed = (config: Config): Typed<TypeLambda> => ({
  by: by(config),
});
