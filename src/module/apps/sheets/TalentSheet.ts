import * as Mixins from "./mixins/Index"

const SheetBase = Mixins.EffectsTab(
  Mixins.ItemSheetStaNg<ItemSheet.Options, TalentSheetData>()
);

export class TalentSheetStaNg extends SheetBase {
  public static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'item', 'talent'],
      width: 550,
      height: 500,
      tabs: [{ navSelector: '.tabs', contentSelector: '.sheet-body', initial: 'description' }]
    });
  }

  public override get template() {
    return "systems/sta-ng/templates/apps/sheets/talent-sheet.hbs";
  }
}
