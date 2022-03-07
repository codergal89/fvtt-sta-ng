export class GenericItemSheetStaNg extends ItemSheet {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta", "sheet", "item"],
      width: 500,
      height: 256,
    });
  }

  override get template() {
    return "systems/sta-ng/templates/apps/sheets/generic-item-sheet.hbs";
  }
}
