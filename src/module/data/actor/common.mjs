/**
 * Data definition common for all actors.
 *
 * @property {string} notes General notes relating to the actor.
 */
export default class ActorDataStaNg extends foundry.abstract.DataModel {
  type = "actor";

  /**
   * @inheritdoc
   */
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      notes: new fields.HTMLField()
    };
  }

}
