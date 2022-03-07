export class FocusSheetStaNg extends ItemSheet {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta", "sheet", "item", "focus"],
      width: 500,
      height: 256,
    });
  }

  override get template() {
    return "systems/sta-ng/templates/apps/sheets/focus-sheet.hbs";
  }
}
