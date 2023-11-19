/**
 * Data definition common for all actors.
 *
 * @property {string} notes General notes relating to the actor.
 */
export default class CommonActorDataStaNg extends foundry.abstract.TypeDataModel {
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
