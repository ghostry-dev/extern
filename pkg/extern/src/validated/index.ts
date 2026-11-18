import type { Config } from "../Config.ts";
import type { StandardSchemaV1 } from "../StandardSchema.ts";
import { by, type By } from "./by/index.ts";

export interface Validated {
  by: <$Out>(schema: StandardSchemaV1<$Out>) => By<$Out>;
}

export const validated = ($config: Config): Validated => ({ by: by($config) });
