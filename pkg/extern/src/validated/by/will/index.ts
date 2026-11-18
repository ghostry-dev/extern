import type { Config } from "../../../Config.ts";
import type { StandardSchemaV1 } from "../../../StandardSchema.ts";
import type { Disambiguation, Promisable } from "../../../Types.ts";
import { will as $will } from "../../Core.ts";

export type will<$Out> = (fn: () => Promisable<$Out>) => Promise<$Out>;

export const will =
  <$Out>(
    config: Config,
    schema: StandardSchemaV1<$Out>,
    disamb: Disambiguation.ForValue,
  ): will<$Out> =>
  async (fn: () => Promisable<$Out>): Promise<$Out> => {
    return $will<$Out, never>(config, schema, disamb, async () => fn());
  };
