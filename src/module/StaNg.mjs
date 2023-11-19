import { registerActorSheets } from "./applications/actor/_module.mjs";
import * as dataModels from "./data/_module.mjs";
import * as documents from "./documents/_module.mjs";

globalThis.StaNg = {
  dataModels
};

Hooks.once("init", async () => {
  game.StaNg = {
    documents: documents.config
  };

  CONFIG.Actor.documentClass = documents.BaseActorStaNg;
  CONFIG.Actor.dataModels = dataModels.actor.config;

  CONFIG.Item.documentClass = documents.BaseItemStaNg;
  CONFIG.Actor.dataModels = dataModels.item.config;

  registerActorSheets();
});

export { dataModels };
