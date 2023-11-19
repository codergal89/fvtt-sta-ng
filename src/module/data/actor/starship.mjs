import CommonCraftDataStaNg from "./common-craft.mjs";

export default class StarshipDataStaNg extends CommonCraftDataStaNg {
  static defineSchema() {
    const fields = foundry.data.fields;

    return foundry.utils.mergeObject(super.defineSchema(), {
      crew: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 }),
      designation: new fields.StringField({ required: true, trim: true }),
      refit: new fields.StringField({ required: true, trim: true }),
      servicedate: new fields.NumberField({ required: true, integer: false, initial: 0, min: 0 })
    });
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    const structure = this.systems.structure.value;
    const security = this.departments.security;
    this.shields.max = structure + security;
    this.power.max = Math.ceil(this.system.systems.engines.value / 2);
    this.crew.max = this.system.scale;
    this.resistance = this.system.scale;
  }
}
