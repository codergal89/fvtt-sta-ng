export class ActorSheetStaNg extends ActorSheet {
  get template() {
    if (!game.user.isGM && this.actor.limited ) {
      return "systems/sta-ng/templates/apps/sheets/limited-sheet.hbs";
    }
    return `systems/sta-ng/templates/apps/sheets/${this.actor.type}-sheet.hbs`;
  }
}