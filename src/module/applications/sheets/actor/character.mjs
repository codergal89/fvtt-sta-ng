import { ActorSheetStaNg } from "./common.mjs";

export class CharacterSheetStaNg extends ActorSheetStaNg {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["sta", "sheet", "actor", "character"],
      width: 850,
      height: 910,
      dragDrop: [
        {
          dragSelector: ".item-list .item",
          dropSelector: null
        }
      ]
    });
  }

}
