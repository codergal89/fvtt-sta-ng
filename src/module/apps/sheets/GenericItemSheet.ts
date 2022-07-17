export class GenericItemSheetStaNg extends ItemSheet {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'item'],
      width: 500,
      height: 400,
      tabs: [{ navSelector: '.tabs', contentSelector: '.sheet-body', initial: 'description' }],
    });
  }

  override get template() {
    return 'systems/sta-ng/templates/apps/sheets/generic-item-sheet.hbs';
  }
}
