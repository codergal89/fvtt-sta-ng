export class TalentSheetStaNg extends ItemSheet {
  public static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'item', 'talent'],
      width: 550,
      height: 300,
      tabs: [{navSelector: '.tabs', contentSelector: '.sheet-body', initial: 'description'}]
    });
  }

  public override get template() {
    return "systems/sta-ng/templates/apps/sheets/talent-sheet.hbs";
  }
}
