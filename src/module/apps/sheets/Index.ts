import { ArmorSheetStaNg } from "./ArmorSheet.js";
import { CharacterSheetStaNg } from "./CharacterSheet.js";
import { CharacterWeaponSheetStaNg } from "./CharacterWeaponSheet.js";
import { ExtendedTaskSheetStaNg } from "./ExtendedTaskSheet.js";
import { GenericItemSheetStaNg } from "./GenericItemSheet.js";
import { SmallCraftContainerSheetStaNg } from "./SmallCraftContainerSheet.js";
import { StarshipWeaponSheetStaNg } from "./StarshipWeaponSheet.js";
import { TalentSheetStaNg } from "./TalentSheet.js";

export {
  ArmorSheetStaNg,
  CharacterSheetStaNg,
  CharacterWeaponSheetStaNg,
  ExtendedTaskSheetStaNg,
  GenericItemSheetStaNg,
  SmallCraftContainerSheetStaNg,
  StarshipWeaponSheetStaNg,
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
 * Register our system's item applications (sheets) with the Foundry infrastructure
 */
function registerItemSheets(): void {
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("sta-ng", ArmorSheetStaNg, {
    types: ["armor"],
    makeDefault: true
  })
  Items.registerSheet("sta-ng", CharacterWeaponSheetStaNg, {
    types: ["characterweapon"],
    makeDefault: true
  })
  Items.registerSheet("sta-ng", GenericItemSheetStaNg, {
    types: ["focus", "injury", "item", "milestone", "value"],
    makeDefault: true
  })
  Items.registerSheet("sta-ng", SmallCraftContainerSheetStaNg, {
    types: ["smallcraftcontainer"],
    makeDefault: true
  })
  Items.registerSheet("sta-ng", StarshipWeaponSheetStaNg, {
    types: ["starshipweapon"],
    makeDefault: true
  })
  Items.registerSheet("sta-ng", TalentSheetStaNg, {
    types: ["talent"],
  });
}
