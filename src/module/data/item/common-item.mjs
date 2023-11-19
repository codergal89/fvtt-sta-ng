/**
 * Data definition common for all items.
 *
 * @property {string} description - The description of the item.
 */
export default class CommonItemDataStaNg extends foundry.abstract.TypeDataModel {
  /**
   * @inheritdoc
   */
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      description: new fields.HTMLField()
    };
  }

}
