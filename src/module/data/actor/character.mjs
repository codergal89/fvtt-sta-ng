import ActorDataStaNg from "./common.mjs";

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
      assignment: new fields.StringField({ label: "sta.actor.character.assignment", required: true, trim: true }),

      attributes: new fields.SchemaField({
        control: new fields.NumberField({ label: "sta.actor.character.attribute.control", integer: true, initial: 7, min: 0, max: 12 }),
        daring: new fields.NumberField({ label: "sta.actor.character.attribute.daring", integer: true, initial: 7, min: 0, max: 12 }),
        fitness: new fields.NumberField({ label: "sta.actor.character.attribute.fitness", integer: true, initial: 7, min: 0, max: 12 }),
        insight: new fields.NumberField({ label: "sta.actor.character.attribute.insight", integer: true, initial: 7, min: 0, max: 12 }),
        presence: new fields.NumberField({ label: "sta.actor.character.attribute.presence", integer: true, initial: 7, min: 0, max: 12 }),
        reason: new fields.NumberField({ label: "sta.actor.character.attribute.reason", integer: true, initial: 7, min: 0, max: 12 })
      }),

      determination: new fields.NumberField({ label: "sta.actor.character.determination", integer: true, initial: 1, min: 0, max: 3 }),

      disciplines: new fields.SchemaField({
        command: new fields.NumberField({ label: "sta.actor.character.discipline.command", integer: true, initial: 0, min: 0, max: 5 }),
        conn: new fields.NumberField({ label: "sta.actor.character.discipline.conn", integer: true, initial: 0, min: 0, max: 5 }),
        engineering: new fields.NumberField({ label: "sta.actor.character.discipline.engineering", integer: true, initial: 0, min: 0, max: 5 }),
        medicine: new fields.NumberField({ label: "sta.actor.character.discipline.medicine", integer: true, initial: 0, min: 0, max: 5 }),
        science: new fields.NumberField({ label: "sta.actor.character.discipline.science", integer: true, initial: 0, min: 0, max: 5 }),
        security: new fields.NumberField({ label: "sta.actor.character.discipline.security", integer: true, initial: 0, min: 0, max: 5 })
      }),

      environment: new fields.StringField({ label: "sta.actor.character.environment", required: true, trim: true }),
      milestones: new fields.StringField({ label: "sta.actor.character.milestones", required: true, trim: true }),
      rank: new fields.StringField({ label: "sta.actor.character.rank", required: true, trim: true }),
      reputation: new fields.NumberField({ label: "sta.actor.character.reputation", integer: true, initial: 0, min: 0 }),
      species: new fields.StringField({ label: "sta.actor.character.species", required: true, trim: true }),
      stress: new fields.SchemaField({
        value: new fields.NumberField({ label: "sta.actor.character.stress", integer: true, initial: 0, min: 0 })
      }),
      upbringing: new fields.StringField({ label: "sta.actor.character.upbringing", required: true, trim: true })
    });
  }
}
