import ActorDataStaNg from "./common-actor.mjs";

/**
 * Data definition for Extended Task actors.
 *
 * @property {number} breakthroughs - The amount of breakthroughs that have been achieved so far.
 * @property {number} difficulty - The difficulty of the task.
 * @property {number} magnitude - The number of breakthroughs required.
 * @property {number} progress - The current progress on the work track.
 * @property {number} resistance - The resistance of the task.
 * @property {number} work - The size of the work track.
 */
export default class ExtendedTaskDataStaNg extends ActorDataStaNg {
  static defineSchema() {
    const fields = foundry.data.fields;

    return foundry.utils.mergeObject(super.defineSchema(), {
      breakthroughs: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 }),
      difficulty: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 }),
      magnitude: new fields.NumberField({ required: true, integer: true, initial: 1, min: 0 }),
      progress: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 }),
      resistance: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 }),
      work: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 })
    });
  }
}
