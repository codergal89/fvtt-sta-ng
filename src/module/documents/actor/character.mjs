import { ActorStaNg } from "./actor.mjs";

export class CharacterStaNg extends ActorStaNg {
  prepareBaseData() {
    super.prepareBaseData();

    const attributes = this.system.attributes;
    const disciplines = this.system.disciplines;
    this.system.stress.max = attributes.fitness + disciplines.security;
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
