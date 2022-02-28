import { STACharacterSheet } from "./apps/CharacterSheet.js";
import { STAExtendedTaskSheet } from "./apps/ExtendedTaskSheet.js";
import { STASmallCraftSheet } from "./apps/SmallCraftSheet.js";
import { STAStarshipSheet } from "./apps/StarshipSheet.js";
import { STAArmorSheet } from "./items/armor-sheet.js";
import { STACharacterWeaponSheet } from "./items/character-weapon-sheet.js";
import { STAGenericSheet } from "./items/generic-sheet.js";
import { STAItemSheet } from "./items/item-sheet.js";
import { STASmallCraftContainerSheet } from "./items/smallcraftcontainer-sheet.js";
import { STAStarshipWeaponSheet } from "./items/starship-weapon-sheet.js";
import { STATalentSheet } from "./items/talent-sheet.js";

export function registerApplications() : void {
  registerActorApplications();
  registerItemApplications();
}

/**
 * Register out system's actor applications (sheets) with the Foundry infrastructure
 */
 function registerActorApplications(): void {
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("sta-ng", STACharacterSheet, {
    types: ["character"],
    makeDefault: true
  });
  Actors.registerSheet("sta-ng", STAStarshipSheet, {
    types: ["starship"]
  });
  Actors.registerSheet("sta-ng", STASmallCraftSheet, {
    types: ["smallcraft"],
  });
  Actors.registerSheet("sta-ng", STAExtendedTaskSheet, {
    types: ["extendedtask"]
  });
}

/**
 * Register out system's item applications (sheets) with the Foundry infrastructure
 */
 function registerItemApplications(): void {
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
  Items.registerSheet("sta-ng", STATalentSheet, {
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
