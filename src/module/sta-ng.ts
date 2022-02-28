import { STAActor } from "./actors/actor.js";
import { STACharacterSheet } from "./actors/sheets/character-sheet.js";
import { STAStarshipSheet } from "./actors/sheets/starship-sheet.js";
import { STASmallCraftSheet } from "./actors/sheets/smallcraft-sheet.js";
import { STAExtendedTaskSheet } from "./actors/sheets/extended-task-sheet.js";
import { STAItemSheet } from "./items/item-sheet.js";
import { STACharacterWeaponSheet } from "./items/character-weapon-sheet.js";
import { STAStarshipWeaponSheet } from "./items/starship-weapon-sheet.js";
import { STAArmorSheet } from "./items/armor-sheet.js";
import { STATalentSheet } from "./items/talent-sheet.js";
import { STAGenericSheet } from "./items/generic-sheet.js";
import { STASmallCraftContainerSheet } from "./items/smallcraftcontainer-sheet.js";
import { StaNg } from "./apps/tracker.js";
import { STAItem } from "./items/item.js";
import { register_dsn_ufp_themes } from "./third-party/dice-so-nice.js";
import { registerSystemSettings } from "./settings.js";
import { registerApplications } from "./applications.js";

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
      STACharacterSheet,
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
      STAItem,
    },
    entities: {
      STAActor,
    }
  };

  CONFIG.Actor.documentClass = STAActor;
  CONFIG.Item.documentClass = STAItem;
}

Hooks.on("renderChatLog", (_app: ChatLog, html: any) =>
  STAItem.chatListeners(html)
);

Hooks.on("ready", () => {
  const tracker = new  StaNg.Apps.Tracker();
  renderTemplate("systems/sta-ng/templates/apps/tracker.html", {}).then(() => {
    tracker.render(true);
  });
});

Hooks.once("diceSoNiceReady", (dice3d: DiceSoNice.Dice3D) => {
  register_dsn_ufp_themes(dice3d);
});
