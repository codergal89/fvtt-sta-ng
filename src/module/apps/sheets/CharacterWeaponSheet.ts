import { GenericItemSheetStaNg } from "./GenericItemSheet.js";

export class CharacterWeaponSheetStaNg extends GenericItemSheetStaNg {
  public static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'item', 'characterweapon'],
      width: 565,
      height: 400,
      tabs: [{ navSelector: '.tabs', contentSelector: '.sheet-body', initial: 'description' }]
    });
  }

  public override get template(): string {
    return "systems/sta-ng/templates/apps/sheets/characterweapon-sheet.hbs";
  }
}
