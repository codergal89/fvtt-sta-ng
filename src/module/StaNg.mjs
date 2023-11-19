import { CharacterSheetStaNg } from "./applications/sheets/actor/character.mjs";
import * as dataModels from "./data/_module.mjs";
import * as documents from "./documents/_module.mjs";

globalThis.StaNg = {
  dataModels
};

Hooks.once("init", async () => {
  game.StaNg = {
    documents: documents.documents
  };

  CONFIG.Actor.documentClass = documents.ActorStaNg;
  CONFIG.Actor.dataModels = dataModels.actor.config;

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("sta-ng", CharacterSheetStaNg, {
    types: ["character"],
    makeDefault: true
  });

});
