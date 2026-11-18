import type { Config } from "../../../Config.ts";
import type { StandardSchemaV1 } from "../../../StandardSchema.ts";
import { will } from "./will/index.ts";

export interface Given<$Out, $In> {
  will: will<$Out, $In>;
}

export type given<$Out> = <const $In>(given: $In) => Given<$Out, $In>;

export const given =
  <$Out>(config: Config, schema: StandardSchemaV1<$Out>): given<$Out> =>
  <const $In>(given: $In): Given<$Out, $In> => ({
    will: will<$Out, $In>(config, schema, given),
  });
