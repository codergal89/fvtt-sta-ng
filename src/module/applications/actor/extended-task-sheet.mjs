import { ActorSheetStaNg } from "./actor-sheet.mjs";

/**
 * The actor sheet for Character actors.
 *
 * @property {ExtendedTaskStaNg}  object - The displayed Extended Task.
 */
export class ExtendedTaskSheetStaNg extends ActorSheetStaNg {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["sta", "sheet", "actor", "extendedtask"],
      width: 500,
      height: 600
    });
  }

  async getData(options) {
    const baseData = await super.getData(options);

    return baseData;
  }
}
