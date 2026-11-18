import type { Config } from "../../Config.ts";
import { InvalidSchemaError } from "../../Error.ts";
import type { StandardSchemaV1 } from "../../StandardSchema.ts";
import { given } from "./given/index.ts";
import { named } from "./named/index.ts";
import { will } from "./will/index.ts";

export interface By<$Out> {
  named: named<$Out>;
  given: given<$Out>;
  will: will<$Out>;
}

export const by =
  (config: Config) =>
  <$Out>(schema: StandardSchemaV1<$Out>): By<$Out> => {
    if (!schema["~standard"]) throw new InvalidSchemaError();

    return {
      named: named<$Out>(config, schema),
      given: given<$Out>(config, schema),
      will: will<$Out>(config, schema, {}),
    };
  };
