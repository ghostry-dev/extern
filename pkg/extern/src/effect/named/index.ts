import type { Config } from "../../Config.ts";
import type { Name } from "../../Types.ts";
import { given } from "./given/index.ts";
import { will } from "./will/index.ts";

export interface Named<$Name extends Name> {
  name: $Name;
  given: given<$Name>;
  will: will;
}

export type named = <$Name extends Name>(name: $Name) => Named<$Name>;

export const named =
  (config: Config): named =>
  <$Name extends Name>(name: $Name): Named<$Name> => ({
    name,
    given: given<$Name>(config, name),
    will: will(config, { named: name }),
  });
