import { ActorStaNg } from "./actors/Entity.js";
import * as Apps from "./apps/Index.js";
import { ResourceTracker } from "./apps/ResourceTracker.js";
import { ItemStaNg } from "./items/Entity.js";
import { register_dsn_ufp_themes } from "./third-party/dice-so-nice.js";
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
  Apps.register();
  Settings.register();
  loadHandlebarsTemplates();
});

/**
 * Register our system's classes with the Foundry infrastructure.
 */
function registerSystemClasses(): void {
  game["sta-ng"] = {
    applications: {
      ArmorSheet: Apps.ArmorSheetStaNg,
      CharacterSheet: Apps.CharacterSheetStaNg,
      CharacterWeaponSheet: Apps.STACharacterWeaponSheet,
      ItemSheet: Apps.GenericItemSheetStaNg,
      SmallCraftContainerSheet: Apps.STASmallCraftContainerSheet,
      StarshipWeaponSheet: Apps.STAStarshipWeaponSheet,
      TalentSheet: Apps.TalentSheetStaNg,
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
