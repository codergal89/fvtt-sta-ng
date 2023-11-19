import { CharacterSheetStaNg } from "./character-sheet.mjs";

/**
 * Register all actor sheets for the corresponding type.
 */
export function registerActorSheets() {
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("sta-ng", CharacterSheetStaNg, {
    types: ["character"],
    makeDefault: true
  });
}
