import ActorDataStaNg from "./common-actor.mjs";

/**
 * Data definition common for all craft actors.
 *
 * @property {string} notes General notes relating to the actor.
 */
export default class CraftDataStaNg extends ActorDataStaNg {
  type = "actor";

  static get _departmentLimit() {
    return 5;
  }

  /**
   * @inheritdoc
   */
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      departments: new fields.SchemaField({
        command: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0, max: this._departmentLimit }),
        conn: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0, max: this._departmentLimit }),
        engineering: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0, max: this._departmentLimit }),
        medicine: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0, max: this._departmentLimit }),
        science: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0, max: this._departmentLimit }),
        security: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0, max: this._departmentLimit })
      }),
      power: new fields.SchemaField({
        value: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 })
      }),
      profile: new fields.StringField({ required: true, trim: true }),
      scale: new fields.NumberField({ required: true, integer: true, initial: 1, min: 1 }),
      shields: new fields.SchemaField({
        value: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 })
      }),
      spaceframe: new fields.StringField({ required: true, trim: true }),
      systems: new fields.SchemaField({
        communications: new fields.SchemaField({
          value: new fields.NumberField({ required: true, integer: true, initial: 7, min: 0, max: 12 }),
          breaches: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 })
        }),
        computers: new fields.SchemaField({
          value: new fields.NumberField({ required: true, integer: true, initial: 7, min: 0, max: 12 }),
          breaches: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 })
        }),
        engines: new fields.SchemaField({
          value: new fields.NumberField({ required: true, integer: true, initial: 7, min: 0, max: 12 }),
          breaches: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 })
        }),
        sensors: new fields.SchemaField({
          value: new fields.NumberField({ required: true, integer: true, initial: 7, min: 0, max: 12 }),
          breaches: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 })
        }),
        structure: new fields.SchemaField({
          value: new fields.NumberField({ required: true, integer: true, initial: 7, min: 0, max: 12 }),
          breaches: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 })
        }),
        weapons: new fields.SchemaField({
          value: new fields.NumberField({ required: true, integer: true, initial: 7, min: 0, max: 12 }),
          breaches: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 })
        })
      }),
      traits: new fields.StringField({ required: true, trim: true })
    };
  }
}
