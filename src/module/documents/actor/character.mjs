import { ActorStaNg } from "./actor.mjs";

/**
 * The Character document.
 *
 * @property {CharacterDataStaNg} system
 */
export class CharacterStaNg extends ActorStaNg {
  async _preUpdate(changed, options, user) {
    if ((await super._preUpdate(changed, options, user)) === false) {
      return false;
    }

    const stress = foundry.utils.getProperty(changed, "system.stress.value");
    const fitness = this.system.attributes.fitness;
    const security = this.system.disciplines.security;

    if (stress > fitness + security) {
      foundry.utils.setProperty(changed, "system.stress.value", fitness + security);
    }
  }

  get _acceptableItemTypes() {
    return ["armor", "characterWeapon", "focus", "injury", "item", "talent", "value"];
  }
}
