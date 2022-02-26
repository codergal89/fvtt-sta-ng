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
import { STATracker } from "./apps/tracker.js";
import { STAItem } from "./items/item.js";
import { register_dsn_ufp_themes } from "./third-party/dice-so-nice.js";

Hooks.once("init", () => {
  console.log("sta-ng | Initializing the sta-ng Game System");

  CONFIG.Combat.initiative = {
    decimals: 0,
    formula: "@disciplines.security.value"
  };

  _register_system_classes();
  _register_actor_applications();
  _register_item_applications();
  _register_game_settings();
});

/**
 * Register our system's classes with the Foundry infrastructure.
 */
function _register_system_classes(): void {
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

/**
 * Register out system's actor applications (sheets) with the Foundry infrastructure
 */
function _register_actor_applications(): void {
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("sta-ng", STACharacterSheet, {
    types: ["character"],
    makeDefault: true
  });
  Actors.registerSheet("sta-ng", STAStarshipSheet, {
    types: ["starship"]
  });
  Actors.registerSheet("sta-ng", STASmallCraftSheet, {
    types: ["smallcraft"],
  });
  Actors.registerSheet("sta-ng", STAExtendedTaskSheet, {
    types: ["extendedtask"]
  });
}

/**
 * Register out system's item applications (sheets) with the Foundry infrastructure
 */
 function _register_item_applications(): void {
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("sta-ng", STAItemSheet, {
    types: ["item"],
    makeDefault: true
  });
  Items.registerSheet("sta-ng", STACharacterWeaponSheet, {
    types: ["characterweapon"],
  });
  Items.registerSheet("sta-ng", STAStarshipWeaponSheet, {
    types: ["starshipweapon"],
  });
  Items.registerSheet("sta-ng", STAArmorSheet, {
    types: ["armor"],
  });
  Items.registerSheet("sta-ng", STATalentSheet, {
    types: ["talent"],
  });
  Items.registerSheet("sta-ng", STAGenericSheet, {
    types: ["value"],
  });
  Items.registerSheet("sta-ng", STAGenericSheet, {
    types: ["focus"],
  });
  Items.registerSheet("sta-ng", STAGenericSheet, {
    types: ["injury"],
  });
  Items.registerSheet("sta-ng", STASmallCraftContainerSheet, {
    types: ["smallcraftcontainer"],
  });
}

/**
 * Register out system's settings with the Foundry infrastructure
 */
function _register_game_settings(): void {
  game.settings.register("sta-ng", "multipleComplications", {
    name: "Multiple Complications:",
    hint: "The rulebook states \"Any die which rolled 20 causes a complication\". This is slightly unclear and as of Version 8 of the PDF, this is still not clear - likely due to the incredible rarity. Enabling this will allow roles to display \"There were x Complications\" if multiple 20s are rolled. Disabling will just state a single complication.",
    scope: "world",
    type: Boolean,
    default: true,
    config: true
  });

  game.settings.register("sta-ng", "threatPermissionLevel", {
    name: "Threat Tracker User Role:",
    hint: "Who should be allowed to amend the threat tracker?",
    scope: "world",
    type: String,
    default: "ASSISTANT",
    config: true,
    choices: {
      "PLAYER": "Players",
      "TRUSTED": "Trusted Players",
      "ASSISTANT": "Assistant Gamemaster",
      "GAMEMASTER": "Gamemasters",
    }
  });

  game.settings.register("sta-ng", "momentumPermissionLevel", {
    name: "Momentum Tracker User Role:",
    hint: "Who should be allowed to amend the momentum tracker?",
    scope: "world",
    type: String,
    default: "PLAYER",
    config: true,
    choices: {
      "PLAYER": "Players",
      "TRUSTED": "Trusted Players",
      "ASSISTANT": "Assistant Gamemaster",
      "GAMEMASTER": "Gamemasters",
    }
  });

  game.settings.register("sta-ng", "maxNumberOfReputation", {
    name: "Maximum amount of Reputation:",
    hint: "Max number of reputation that can be given to a character. 10 is default.",
    scope: "world",
    type: Number,
    default: 20,
    config: true
  });

  game.settings.register("sta-ng", "threat", {
    scope: "world",
    type: Number,
    default: 0,
    config: false
  });

  game.settings.register("sta-ng", "momentum", {
    scope: "world",
    type: Number,
    default: 0,
    config: false
  });
}

Hooks.on("renderChatLog", (_app: ChatLog, html: any) =>
  STAItem.chatListeners(html)
);

Hooks.on("ready", () => {
  const tracker = new STATracker();
  renderTemplate("systems/sta-ng/templates/apps/tracker.html", {}).then(() => {
    tracker.render(true);
  });
});

Hooks.once("diceSoNiceReady", (dice3d: Dice3d) => {
  register_dsn_ufp_themes(dice3d);
});
