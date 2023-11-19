import CommonItemDataStaNg from "./common-item.mjs";

export default class ItemDataStaNg extends CommonItemDataStaNg {
  static defineSchema() {
    const fields = foundry.data.fields;

    return foundry.utils.mergeObject(super.defineSchema(), {
      escalation: new fields.NumberField({required: true, integer: true, initial: 0, min: 0}),
      opportunity: new fields.NumberField({required: true, integer: true, initial: 0, min: 0}),
      quantity: new fields.NumberField({required: true, integer: true, initial: 1, min: 0})
    });
  }
}
