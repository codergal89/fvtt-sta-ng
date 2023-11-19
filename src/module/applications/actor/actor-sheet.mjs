/**
 * @typedef {object} ActorResourceTrackData
 * @property {number} limit
 * @property {object} track
 * @property {number} track.id
 * @property {number} track.label
 * @property {boolean} track.selected
 */

/**
 * The base for all actor sheets.
 *
 * @property {ActorStaNg} actor - The actor displayed in this sheet
 */
export class ActorSheetStaNg extends ActorSheet {
  /**
   * @returns {string} The path to the sheet HTML template.
   * @inheritdoc
   */
  get template() {
    if (!game.user.isGM && this.actor.limited ) {
      return "systems/sta-ng/templates/apps/sheets/limited-sheet.hbs";
    }
    return `systems/sta-ng/templates/apps/sheets/${this.actor.type}-sheet.hbs`;
  }

  /**
   * Generate a data descriptor for a track for a given resource.
   *
   * @param {object} resource The resource to generate the track descriptor for.
   * @param {number} resource.max
   * @param {number} resource.value
   *
   * @returns {ActorResourceTrackData}
   *
   * @protected
   */
  _trackDataFor(resource) {
    return {
      limit: resource.max,
      track: Array.from(Array(resource.max).keys()).map(id => ({
        id: id,
        label: id + 1,
        selected: id < resource.value
      }))
    };
  }
}
