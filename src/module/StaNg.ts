import { ActorStaNg } from "./actors/Entity.js";
import * as Apps from "./apps/Index.js";
import { ResourceTracker } from "./apps/ResourceTracker.js";
import { ItemStaNg } from "./items/Entity.js";
import * as DiceSoNice from "./third-party/DiceSoNice.js";
import * as Settings from "./Settings.js";
import { attachChatListeners } from "./ChatListeners.js";
import * as Dice from "./dice/Index.js";

Hooks.once("init", () => {
  console.log("sta-ng | Initializing the sta-ng Game System");

  CONFIG.Combat.initiative = {
    decimals: 0,
    formula: "@disciplines.security.value"
  };

  registerSystemClasses();
  Apps.Sheets.register();
  Settings.register();
  loadHandlebarsTemplates();
});

/**
 * Register our system's classes with the Foundry infrastructure.
 */
function registerSystemClasses(): void {
  game["sta-ng"] = {
    applications: {
      ArmorSheet: Apps.Sheets.ArmorSheetStaNg,
      CharacterSheet: Apps.Sheets.CharacterSheetStaNg,
      CharacterWeaponSheet: Apps.Sheets.CharacterWeaponSheetStaNg,
      ItemSheet: Apps.Sheets.GenericItemSheetStaNg,
      SmallCraftContainerSheet: Apps.Sheets.SmallCraftContainerSheetStaNg,
      SmallCraftSheet: Apps.Sheets.SmallCraftSheetStaNg,
      StarshipWeaponSheet: Apps.Sheets.StarshipWeaponSheetStaNg,
      TalentSheet: Apps.Sheets.TalentSheetStaNg,
    },
    entities: {
      ItemStaNg,
      ActorStaNg,
    }
  };

  CONFIG.Actor.documentClass = ActorStaNg;
  CONFIG.Item.documentClass = ItemStaNg;
  CONFIG.Dice.rolls.push(Dice.ChallengeRoll);
  CONFIG.Dice.rolls.push(Dice.TaskRoll)
  CONFIG.Dice.terms[Dice.ChallengeDie.DENOMINATION] = Dice.ChallengeDie;
  CONFIG.Dice.terms[Dice.TaskDie.DENOMINATION] = Dice.TaskDie;
}

async function loadHandlebarsTemplates() {
  const templates = [
    "apps/dialogs/dialog-challenge-roll.hbs",
    "apps/dialogs/dialog-character-task-roll.hbs",
    "apps/sheets/parts/tab-description.hbs",
    "apps/sheets/parts/tab-effects.hbs",
    "apps/sheets/armor-sheet.hbs",
    "apps/sheets/character-sheet.hbs",
    "apps/sheets/characterweapon-sheet.hbs",
    "apps/sheets/extendedtask-sheet.hbs",
    "apps/sheets/generic-item-sheet.hbs",
    "apps/sheets/limited-sheet.hbs",
    "apps/sheets/smallcraft-sheet.hbs",
    "apps/sheets/smallcraftcontainer-sheet.hbs",
    "apps/sheets/starship-sheet.hbs",
    "apps/sheets/starshipweapon-sheet.hbs",
    "apps/sheets/talent-sheet.hbs",
    "apps/resource-tracker.hbs",
    "chat/challenge-roll.hbs",
    "chat/challenge-tooltip.hbs",
    "chat/item.hbs",
    "chat/task-roll.hbs",
  ]
  return loadTemplates(templates.map(t => `systems/sta-ng/templates/${t}`));
}

Hooks.on("renderChatLog", (_app: ChatLog, html: JQuery<HTMLElement>) => attachChatListeners(html));

Hooks.on("ready", () => {
  const tracker = new ResourceTracker();
  tracker.render(true);
});

Hooks.once("diceSoNiceReady", (dice3d: DiceSoNice.Dice3D) => {
  DiceSoNice.registerUfpThemes(dice3d);
});
