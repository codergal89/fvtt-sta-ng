import ActorDataStaNg from "./common-actor.mjs";

/**
 * Data definition for Character actors.
 *
 * @property {string} assignment
 * @property {object} attributes
 * @property {number} attributes.control
 * @property {number} attributes.daring
 * @property {number} attributes.fitness
 * @property {number} attributes.insight
 * @property {number} attributes.presence
 * @property {number} attributes.reason
 * @property {number} determination
 * @property {object} disciplines
 * @property {number} disciplines.command
 * @property {number} disciplines.conn
 * @property {number} disciplines.engineering
 * @property {number} disciplines.medicine
 * @property {number} disciplines.science
 * @property {number} disciplines.security
 * @property {string} environment
 * @property {string} milestones
 * @property {string} rank
 * @property {number} reputation
 * @property {string} species
 * @property {object} stress
 * @property {number} stress.max
 * @property {number} stress.value
 * @property {string} upbringing
 */
export default class CharacterDataStaNg extends ActorDataStaNg {
  static defineSchema() {
    const fields = foundry.data.fields;

    return foundry.utils.mergeObject(super.defineSchema(), {
      assignment: new fields.StringField({ required: true, trim: true }),

      attributes: new fields.SchemaField({
        control: new fields.NumberField({ integer: true, initial: 7, min: 0, max: 12 }),
        daring: new fields.NumberField({ integer: true, initial: 7, min: 0, max: 12 }),
        fitness: new fields.NumberField({ integer: true, initial: 7, min: 0, max: 12 }),
        insight: new fields.NumberField({ integer: true, initial: 7, min: 0, max: 12 }),
        presence: new fields.NumberField({ integer: true, initial: 7, min: 0, max: 12 }),
        reason: new fields.NumberField({ integer: true, initial: 7, min: 0, max: 12 })
      }),

      determination: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 1, min: 0, max: 3 })
      }),

      disciplines: new fields.SchemaField({
        command: new fields.NumberField({ integer: true, initial: 0, min: 0, max: 5 }),
        conn: new fields.NumberField({ integer: true, initial: 0, min: 0, max: 5 }),
        engineering: new fields.NumberField({ integer: true, initial: 0, min: 0, max: 5 }),
        medicine: new fields.NumberField({ integer: true, initial: 0, min: 0, max: 5 }),
        science: new fields.NumberField({ integer: true, initial: 0, min: 0, max: 5 }),
        security: new fields.NumberField({ integer: true, initial: 0, min: 0, max: 5 })
      }),

      environment: new fields.StringField({ required: true, trim: true }),
      milestones: new fields.StringField({ required: true, trim: true }),
      rank: new fields.StringField({ required: true, trim: true }),
      reputation: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
      species: new fields.StringField({ required: true, trim: true }),
      stress: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 0, min: 0 })
      }),
      upbringing: new fields.StringField({ required: true, trim: true })
    });
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    const attributes = this.attributes;
    const disciplines = this.disciplines;
    this.stress.max = attributes.fitness + disciplines.security;

    // FIXME: This should be a system setting
    this.determination.max = 3;
  }
}
