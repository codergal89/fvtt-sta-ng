import * as Apps from "./apps/Index";
import { ResourceTracker } from "./apps/ResourceTracker";
import { ItemStaNg } from "./items/Entity";
import * as DiceSoNice from "./third-party/DiceSoNice";
import * as Settings from "./Settings";
import { attachChatListeners } from "./ChatListeners";
import * as Dice from "./dice/Index";
import * as Actors from "./actors/Index";

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
  game.StaNg = {
    applications: {
      ArmorSheet: Apps.Sheets.ArmorSheetStaNg,
      CharacterSheet: Apps.Sheets.CharacterSheetStaNg,
      CharacterWeaponSheet: Apps.Sheets.CharacterWeaponSheetStaNg,
      ItemSheet: Apps.Sheets.GenericItemSheetStaNg,
      SmallCraftContainerSheet: Apps.Sheets.SmallCraftContainerSheetStaNg,
      SmallCraftSheet: Apps.Sheets.SmallCraftSheetStaNg,
      StarshipWeaponSheet: Apps.Sheets.StarshipWeaponSheetStaNg,
      TalentSheet: Apps.Sheets.TalentSheetStaNg,

      ChallengeRollDialog: Apps.Dialogs.ChallengeRollDialog,
      CraftTaskRollDialog: Apps.Dialogs.CraftTaskRollDialog,
      CharacterTaskRollDialog: Apps.Dialogs.CharacterTaskRollDialog,
    },

    actors: {
      classes: {
        character: Actors.CharacterStaNg,
        extendedtask: Actors.ExtendedTaskStaNg,
        smallcraft: Actors.SmallCraftStaNg,
        starship: Actors.StarshipStaNg,
      }
    }
  };

  CONFIG.Actor.documentClass = Actors.ActorStaNg;
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
