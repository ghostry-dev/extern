import type { Config } from "../../../Config.ts";
import type { Disambiguation, Promisable } from "../../../Types.ts";
import { will as $will } from "../../Core.ts";

export type will = <$O extends Promisable<void>>(fn: () => $O) => $O;

export const will =
  (config: Config, disamb: Disambiguation.ForEffect): will =>
  <$O extends Promisable<void>>(fn: () => $O): $O => {
    return $will<$O, never>(config, disamb, () => fn());
  };
