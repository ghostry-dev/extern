import type { Config } from "../Config.ts";
import { named } from "./named/index.ts";
import { will } from "./will/index.ts";

export interface Effect {
  named: named;
  will: will;
}

export const effect = (config: Config): Effect => ({
  named: named(config),
  will: will(config),
});
