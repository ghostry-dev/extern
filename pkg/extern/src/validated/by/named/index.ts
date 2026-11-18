import type { Config } from "../../../Config.ts";
import type { StandardSchemaV1 } from "../../../StandardSchema.ts";
import type { Name } from "../../../Types.ts";
import { given } from "./given/index.ts";
import { will } from "./will/index.ts";

export interface Named<$Out, $Name extends Name> {
  name: $Name;
  given: given<$Out, $Name>;
  will: will<$Out>;
}

export type named<$Out> = <$Name extends Name>(
  name: $Name,
) => Named<$Out, $Name>;

export const named =
  <$Out>(config: Config, schema: StandardSchemaV1<$Out>): named<$Out> =>
  <$Name extends Name>(name: $Name): Named<$Out, $Name> => ({
    name,
    given: given<$Out, $Name>(config, schema, name),
    will: will<$Out>(config, schema, { named: name }),
  });
