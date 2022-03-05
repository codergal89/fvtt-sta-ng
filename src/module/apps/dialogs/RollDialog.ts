export class RollDialog {
  static async create(type: RollDialog.Type.Challenge, defaultPool: number): Promise<RollDialog.ChallengeData | null>
  static async create(type: RollDialog.Type.CharacterTask, defaultPool: number): Promise<RollDialog.CharacterTaskData | null>
  static async create(type: RollDialog.Type, defaultPool: number): Promise<RollDialog.ChallengeData | RollDialog.CharacterTaskData | null> {
    const html = await renderTemplate(`systems/sta-ng/templates/apps/dialog-${type}-roll.hbs`, { defaultPool });

    return Dialog.prompt({
      title: game.i18n.localize('sta.apps.dicepoolwindow'),
      content: html,
      label: game.i18n.localize('sta.apps.rolldice'),
      rejectClose: false,
      callback: (html: JQuery<HTMLElement>) => {
        const data = new FormData(html.find<HTMLFormElement>("#dice-pool-form")[0]);
        switch (type) {
          case RollDialog.Type.Challenge:
            return this.extractChallengeConfiguration(data);
          case RollDialog.Type.CharacterTask:
            return this.extractCharacterTaskConfiguration(data);
        }
      }
    });
  }

  private static extractChallengeConfiguration(data: FormData): RollDialog.ChallengeData {
    console.log(data);
    return {
      pool: parseInt(data.get("dicePoolValue")?.toString() ?? "0")
    };
  }

  private static extractCharacterTaskConfiguration(data: FormData): RollDialog.CharacterTaskData {
    console.log(data);
    return {
      attribute: data.get("attribute")?.toString() as keyof CharacterDataSource["data"]["attributes"],
      complicationRange: 21 - parseInt(data.get("complicationRange")?.toString() ?? "1"),
      discipline: data.get("discipline")?.toString() as keyof CharacterDataSource["data"]["disciplines"],
      hasFocus: !!data.get("hasFocus"),
      pool: parseInt(data.get("dicePoolSlider")?.toString() ?? "0"),
      usesDetermination: !!data.get("usesDetermination"),
    };
  }
}

export namespace RollDialog {
  export enum Type {
    Challenge = "challenge",
    CharacterTask = "character-task",
  }

  export interface ChallengeData {
    pool: number
  }

  export interface CharacterTaskData {
    attribute: keyof CharacterDataSource["data"]["attributes"]
    complicationRange: number
    discipline: keyof CharacterDataSource["data"]["disciplines"]
    hasFocus: boolean
    pool: number
    usesDetermination: boolean
  }
}
