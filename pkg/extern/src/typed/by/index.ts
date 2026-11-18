import type { Config } from "../../Config.ts";
import type { AnyIdentity } from "../../Types.ts";
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
  <$Out>(identity: AnyIdentity): By<$Out> => ({
    named: named<$Out>(config, identity),
    given: given<$Out>(config, identity),
    will: will<$Out>(config, identity),
  });
