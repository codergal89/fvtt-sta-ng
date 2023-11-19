export { BaseActorStaNg } from "./actor/_module.mjs";
export { BaseItemStaNg } from "./item/_module.mjs";

import * as actor from "./actor/_module.mjs";
import * as item from "./item/_module.mjs";

export const config = {
  actors: actor.config,
  items: item.config
};
