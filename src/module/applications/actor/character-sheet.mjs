import { ActorSheetStaNg } from "./actor-sheet.mjs";

/**
 * The actor sheet for Character actors.
 *
 * @property {CharacterStaNg}  object - The displayed character.
 *
 * @extends ActorSheetStaNg
 */
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

  async getData(options) {
    const baseData = await super.getData(options);

    baseData.tracks = {};
    baseData.tracks.determination = this._trackDataFor(this.object.system.determination);
    baseData.tracks.stress = this._trackDataFor(this.object.system.stress);

    return baseData;
  }
}
