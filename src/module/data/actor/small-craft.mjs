import { StarshipStaNg } from "../../documents/actor/starship.mjs";
import CommonCraftDataStaNg from "./common-craft.mjs";

export default class SmallCraftDataStaNg extends CommonCraftDataStaNg {
  static get _departmentLimit() {
    return 2;
  }

  static defineSchema() {
    const fields = foundry.data.fields;

    return foundry.utils.mergeObject(super.defineSchema(), {
      parent: new fields.ForeignDocumentField(StarshipStaNg, { required: true, nullable: true })
    });
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    const structure = this.systems.structure.value;
    const security = this.departments.security;
    this.shields.max = Math.floor((structure + security) / 2);
    this.power.max = Math.ceil(this.systems.engines.value / 2);
  }
}
