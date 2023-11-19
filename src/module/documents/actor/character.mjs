/** @typedef {import('../../data/actor/character.mjs').default} CharacterDataStaNg */

import { ActorStaNg } from "./actor.mjs";

/**
 * The Character document.
 *
 * @property {CharacterDataStaNg} system
 */
export class CharacterStaNg extends ActorStaNg {
  prepareBaseData() {
    super.prepareBaseData();

    const attributes = this.system.attributes;
    const disciplines = this.system.disciplines;
    this.system.stress.max = attributes.fitness + disciplines.security;

    // FIXME: This should be a system setting
    this.system.determination.max = 3;
  }

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
