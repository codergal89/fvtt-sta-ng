import { BaseActorStaNg } from "./base-actor.mjs";
import { CharacterStaNg } from "./character.mjs";
import { ExtendedTaskStaNg } from "./extended-task.mjs";
import { SmallCraftStaNg } from "./small-craft.mjs";
import { StarshipStaNg } from "./starship.mjs";

export { BaseActorStaNg, CharacterStaNg, ExtendedTaskStaNg, SmallCraftStaNg, StarshipStaNg };

export const config = {
  classes: {
    character: CharacterStaNg,
    extendedtask: ExtendedTaskStaNg,
    smallcraft: SmallCraftStaNg,
    starship: StarshipStaNg
  }
};
