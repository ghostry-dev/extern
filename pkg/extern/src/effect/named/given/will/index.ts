import type { Config } from "../../../../Config.ts";
import type { Disambiguation, Promisable } from "../../../../Types.ts";
import { will as $will } from "../../../Core.ts";

export type will<$In> = <$Out extends Promisable<void>>(
  fn: (given: $In) => $Out,
) => $Out;

export const will =
  <$In>(
    config: Config,
    given: $In,
    disamb: Disambiguation.ForEffect,
  ): will<$In> =>
  <$Out extends Promisable<void>>(fn: (given: $In) => $Out): $Out => {
    return $will<$Out, $In>(config, { ...disamb, given }, () => fn(given));
  };
