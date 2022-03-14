export class StarshipWeaponSheetStaNg extends ItemSheet {
  public static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'item', 'starshipweapon'],
      width: 560,
      height: 420,
      tabs: [{ navSelector: '.tabs', contentSelector: '.sheet-body', initial: 'description' }]
    });
  }

  public override get template(): string {
    return "systems/sta-ng/templates/apps/sheets/starshipweapon-sheet.hbs";
  }
}