import { ActorStaNg } from "./actors/Actor.js";
import { CharacterSheetStaNg } from "./apps/sheets/CharacterSheet.js";
import { STAItemSheet } from "./items/item-sheet.js";
import { STACharacterWeaponSheet } from "./items/character-weapon-sheet.js";
import { STAStarshipWeaponSheet } from "./items/starship-weapon-sheet.js";
import { STAArmorSheet } from "./items/armor-sheet.js";
import { TalentSheetStaNg } from "./apps/sheets/TalentSheet.js";
import { STAGenericSheet } from "./items/generic-sheet.js";
import { STASmallCraftContainerSheet } from "./items/smallcraftcontainer-sheet.js";
import { ResourceTracker } from "./apps/ResourceTracker.js";
import { ItemStaNg } from "./items/Item.js";
import { register_dsn_ufp_themes } from "./third-party/dice-so-nice.js";
import { registerSystemSettings } from "./settings.js";
import { registerApplications } from "./applications.js";
import { attachChatListeners } from "./ChatListeners.js";
import { ChallengeRoll, TaskRoll } from "./dice/Rolls.js";
import { ChallengeDie } from "./dice/ChallengeDie.js";
import { TaskDie } from "./dice/TaskDie.js";

Hooks.once("init", () => {
  console.log("sta-ng | Initializing the sta-ng Game System");

  CONFIG.Combat.initiative = {
    decimals: 0,
    formula: "@disciplines.security.value"
  };

  registerSystemClasses();
  registerApplications();
  registerSystemSettings();
  loadHandlebarsTemplates();
});

/**
 * Register our system's classes with the Foundry infrastructure.
 */
function registerSystemClasses(): void {
  game["sta-ng"] = {
    applications: {
      CharacterSheetStaNg,
      STAItemSheet,
      STACharacterWeaponSheet,
      STAStarshipWeaponSheet,
      STAArmorSheet,
      TalentSheetStaNg,
      STAGenericSheet,
      STASmallCraftContainerSheet,
    },
    entities: {
      ItemStaNg,
      ActorStaNg,
    }
  };

  CONFIG.Actor.documentClass = ActorStaNg;
  CONFIG.Item.documentClass = ItemStaNg;
  CONFIG.Dice.rolls.push(ChallengeRoll);
  CONFIG.Dice.rolls.push(TaskRoll)
  CONFIG.Dice.terms[ChallengeDie.DENOMINATION] = ChallengeDie;
  CONFIG.Dice.terms[TaskDie.DENOMINATION] = TaskDie;
}

async function loadHandlebarsTemplates() {
  const templates = [
    "systems/sta-ng/templates/apps/parts/tab-effects.hbs",
  ]
  return loadTemplates(templates);
}

Hooks.on("renderChatLog", (_app: ChatLog, html: JQuery<HTMLElement>) => attachChatListeners(html));

Hooks.on("ready", () => {
  const tracker = new  ResourceTracker();
  renderTemplate("systems/sta-ng/templates/apps/tracker.html", {}).then(() => {
    tracker.render(true);
  });
});

Hooks.once("diceSoNiceReady", (dice3d: DiceSoNice.Dice3D) => {
  register_dsn_ufp_themes(dice3d);
});
