import { CharacterSheetStaNg } from "./sheets/CharacterSheet.js";
import { ExtendedTaskSheetStaNg } from "./sheets/ExtendedTaskSheet.js"
import { STAArmorSheet } from "./sheets/armor-sheet.js";
import { STACharacterWeaponSheet } from "./sheets/character-weapon-sheet.js";
import { STAGenericSheet } from "./sheets/generic-sheet.js";
import { STAItemSheet } from "./sheets/item-sheet.js";
import { STASmallCraftContainerSheet } from "./sheets/smallcraftcontainer-sheet.js";
import { STAStarshipWeaponSheet } from "./sheets/starship-weapon-sheet.js";
import { TalentSheetStaNg } from "./sheets/TalentSheet.js";

export {
  CharacterSheetStaNg,
  ExtendedTaskSheetStaNg,
  STAArmorSheet,
  STACharacterWeaponSheet,
  STAGenericSheet,
  STAItemSheet,
  STASmallCraftContainerSheet,
  STAStarshipWeaponSheet,
  TalentSheetStaNg
};

export function register(): void {
  registerActorSheets();
  registerItemSheets();
}

/**
 * Register out system's actor applications (sheets) with the Foundry infrastructure
 */
function registerActorSheets(): void {
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("sta-ng", CharacterSheetStaNg, {
    types: ["character"],
    makeDefault: true,
  });
  Actors.registerSheet("sta-ng", ExtendedTaskSheetStaNg, {
    types: ["extendedtask"],
    makeDefault: true,
  })
}

/**
 * Register out system's item applications (sheets) with the Foundry infrastructure
 */
function registerItemSheets(): void {
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("sta-ng", STAItemSheet, {
    types: ["item"],
    makeDefault: true
  });
  Items.registerSheet("sta-ng", STACharacterWeaponSheet, {
    types: ["characterweapon"],
  });
  Items.registerSheet("sta-ng", STAStarshipWeaponSheet, {
    types: ["starshipweapon"],
  });
  Items.registerSheet("sta-ng", STAArmorSheet, {
    types: ["armor"],
  });
  Items.registerSheet("sta-ng", TalentSheetStaNg, {
    types: ["talent"],
  });
  Items.registerSheet("sta-ng", STAGenericSheet, {
    types: ["value"],
  });
  Items.registerSheet("sta-ng", STAGenericSheet, {
    types: ["focus"],
  });
  Items.registerSheet("sta-ng", STAGenericSheet, {
    types: ["injury"],
  });
  Items.registerSheet("sta-ng", STASmallCraftContainerSheet, {
    types: ["smallcraftcontainer"],
  });
}
