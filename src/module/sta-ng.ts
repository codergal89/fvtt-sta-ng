import { ActorStaNg } from "./actors/Actor.js";
import { CharacterSheetStaNg } from "./apps/CharacterSheet.js";
import { STAStarshipSheet } from "./apps/StarshipSheet.js";
import { STASmallCraftSheet } from "./apps/SmallCraftSheet.js";
import { STAExtendedTaskSheet } from "./apps/ExtendedTaskSheet.js";
import { STAItemSheet } from "./items/item-sheet.js";
import { STACharacterWeaponSheet } from "./items/character-weapon-sheet.js";
import { STAStarshipWeaponSheet } from "./items/starship-weapon-sheet.js";
import { STAArmorSheet } from "./items/armor-sheet.js";
import { STATalentSheet } from "./items/talent-sheet.js";
import { STAGenericSheet } from "./items/generic-sheet.js";
import { STASmallCraftContainerSheet } from "./items/smallcraftcontainer-sheet.js";
import { ResourceTracker } from "./apps/ResourceTracker.js";
import { ItemStaNg } from "./items/Item.js";
import { register_dsn_ufp_themes } from "./third-party/dice-so-nice.js";
import { registerSystemSettings } from "./settings.js";
import { registerApplications } from "./applications.js";
import { attachChatListeners } from "./ChatListeners.js";
import { ChallengeRoll } from "./dice/Rolls.js";

Hooks.once("init", () => {
  console.log("sta-ng | Initializing the sta-ng Game System");

  CONFIG.Combat.initiative = {
    decimals: 0,
    formula: "@disciplines.security.value"
  };

  registerSystemClasses();
  registerApplications();
  registerSystemSettings();
});

/**
 * Register our system's classes with the Foundry infrastructure.
 */
function registerSystemClasses(): void {
  game["sta-ng"] = {
    applications: {
      CharacterSheetStaNg,
      STAStarshipSheet,
      STASmallCraftSheet,
      STAExtendedTaskSheet,
      STAItemSheet,
      STACharacterWeaponSheet,
      STAStarshipWeaponSheet,
      STAArmorSheet,
      STATalentSheet,
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
  CONFIG.Dice.rolls.push(ChallengeRoll)
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
