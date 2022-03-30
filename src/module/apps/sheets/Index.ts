import { ArmorSheetStaNg } from "./ArmorSheet";
import { CharacterSheetStaNg } from "./CharacterSheet";
import { CharacterWeaponSheetStaNg } from "./CharacterWeaponSheet";
import { ExtendedTaskSheetStaNg } from "./ExtendedTaskSheet";
import { GenericItemSheetStaNg } from "./GenericItemSheet";
import { SmallCraftContainerSheetStaNg } from "./SmallCraftContainerSheet";
import { SmallCraftSheetStaNg } from "./SmallCraftSheet";
import { SpeciesSheetStaNg } from "./SpeciesSheet";
import { StarshipSheetStaNg } from "./StarshipSheet";
import { StarshipWeaponSheetStaNg } from "./StarshipWeaponSheet";
import { TalentSheetStaNg } from "./TalentSheet";

export {
  ArmorSheetStaNg,
  CharacterSheetStaNg,
  CharacterWeaponSheetStaNg,
  ExtendedTaskSheetStaNg,
  GenericItemSheetStaNg,
  SmallCraftContainerSheetStaNg,
  SmallCraftSheetStaNg,
  SpeciesSheetStaNg,
  StarshipSheetStaNg,
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
  });
  Actors.registerSheet("sta-ng", SmallCraftSheetStaNg, {
    types: ["smallcraft"],
    makeDefault: true,
  });
  Actors.registerSheet("sta-ng", StarshipSheetStaNg, {
    types: ["starship"],
    makeDefault: true,
  });
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
  Items.registerSheet("sta-ng", SpeciesSheetStaNg, {
    types: ["species"],
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
