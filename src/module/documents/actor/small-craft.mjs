import { ActorStaNg } from "./actor.mjs";

/**
 * The Small Craft document.
 *
 * @property {CharacterDataStaNg} system
 */
export class SmallCraftStaNg extends ActorStaNg {
  async _preUpdate(changed, options, user) {
    if ((await super._preUpdate(changed, options, user)) === false) {
      return false;
    }
  }

  get _acceptableItemTypes() {
    return ["injury", "item", "starshipweapon", "talent"];
  }
}
