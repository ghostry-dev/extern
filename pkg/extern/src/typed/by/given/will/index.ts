import type { Config } from "../../../../Config.ts";
import type { AnyIdentity, Promisable, Promised } from "../../../../Types.ts";
import { will as $will } from "../../../Core.ts";

export type will<$Out, $In> = <$O extends Promisable<$Out>>(
  fn: (given: $In) => $O,
) => Promised<$Out, $O>;

export const will =
  <$Out, $In>(
    config: Config,
    identity: AnyIdentity,
    given: $In,
  ): will<$Out, $In> =>
  <$O extends Promisable<$Out>>(fn: (given: $In) => $O): Promised<$Out, $O> => {
    return $will<$O, $In>(config, identity, { given }, () =>
      fn(given),
    ) as Promised<$Out, $O>;
  };
