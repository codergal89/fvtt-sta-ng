/**
 * The base type for all actors in the system.
 * 
 * This class defines fields shared by all actors.
 */
export default class ActorDataStaNg extends foundry.abstract.DataModel {
  type = "actor";

  /**
   * @override
   */
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      notes: new fields.HTMLField(),
    }
  }

  static mergeSchema(target, source) {
    Object.assign(target, source);
    return target;
  }

}
