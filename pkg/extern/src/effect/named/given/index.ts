import type { Config } from "../../../Config.ts";
import type { Name } from "../../../Types.ts";
import { will } from "./will/index.ts";

export interface Given<$Name extends Name, $In> {
  name: $Name;
  will: will<$In>;
}

export type given<$Name extends Name> = <const $In>(
  given: $In,
) => Given<$Name, $In>;

export const given =
  <$Name extends Name>(config: Config, name: $Name): given<$Name> =>
  <const $In>(given: $In): Given<$Name, $In> => ({
    name,
    will: will<$In>(config, given, { named: name }),
  });
