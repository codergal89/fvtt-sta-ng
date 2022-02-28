export class RollDialog {
  static async create(isAttribute: boolean, defaultValue: number): Promise<FormData | null> {
    const html = await renderTemplate(`systems/sta-ng/templates/apps/dicepool-${isAttribute ? "attribute" : "challenge"}.html`, {
      "defaultValue": defaultValue
    });

    return Dialog.prompt({
      title: game.i18n.localize('sta.apps.dicepoolwindow'),
      content: html,
      label: game.i18n.localize('sta.apps.rolldice'),
      rejectClose: false,
      callback: (html: JQuery<HTMLElement>) => {
        return new FormData(html.find<HTMLFormElement>("#dice-pool-form")[0]);
      }
    });
  }
}
