import { BaseActorStaNg } from "./base-actor.mjs";

/**
 * The Starship document.
 *
 * @property {CharacterDataStaNg} system
 */
export class StarshipStaNg extends BaseActorStaNg {
  async _preUpdate(changed, options, user) {
    if ((await super._preUpdate(changed, options, user)) === false) {
      return false;
    }
  }

  get _acceptableItemTypes() {
    return ["injury", "item", "starshipweapon", "talent"];
  }
}
