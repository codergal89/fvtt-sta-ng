export class ArmorSheetStaNg extends ItemSheet {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta", "sheet", "item", "armor"],
      width: 500,
      height: 400,
    });
  }

  override get template() {
    return "systems/sta-ng/templates/apps/sheets/armor-sheet.hbs";
  }
}
