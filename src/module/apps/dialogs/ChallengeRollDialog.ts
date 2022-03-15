export class ChallengeRollDialog {
  static async create(defaultPool: number): Promise<ChallengeRollDialog.ChallengeData | null> {
    const html = await renderTemplate(`systems/sta-ng/templates/apps/dialogs/dialog-challenge-roll.hbs`, { defaultPool });

    return Dialog.prompt({
      title: game.i18n.localize('sta.apps.dicepoolwindow'),
      content: html,
      label: game.i18n.localize('sta.apps.rolldice'),
      rejectClose: false,
      callback: (html: JQuery<HTMLElement>) => {
        const data = new FormData(html.find<HTMLFormElement>("#dice-pool-form")[0]);
        return this.extractChallengeConfiguration(data);
      }
    });
  }

  private static extractChallengeConfiguration(data: FormData): ChallengeRollDialog.ChallengeData {
    console.log(data);
    return {
      pool: parseInt(data.get("dicePoolValue")?.toString() ?? "0")
    };
  }
}

export namespace ChallengeRollDialog {
  export interface ChallengeData {
    pool: number
  }
}
