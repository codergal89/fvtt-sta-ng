import { CharacterSheetStaNg } from "./character-sheet.mjs";
import { ExtendedTaskSheetStaNg } from "./extended-task-sheet.mjs";

/**
 * Register all actor sheets for the corresponding type.
 */
export function registerActorSheets() {
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("sta-ng", CharacterSheetStaNg, {
    types: ["character"],
    makeDefault: true
  });
  Actors.registerSheet("sta-ng", ExtendedTaskSheetStaNg, {
    types: ["extendedtask"],
    makeDefault: true
  });
}
