import { EffectsTab } from "./mixins/EffectsTab";

export class SpeciesSheetStaNg extends EffectsTab(ItemSheet) {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta", "sheet", "item"],
      width: 600,
      height: 650,
      tabs: [{ navSelector: '.tabs', contentSelector: '.sheet-body', initial: 'description' }]
    });
  }

  override get template() {
    return "systems/sta-ng/templates/apps/sheets/species-sheet.hbs";
  }
}
