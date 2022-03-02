export default class ChallengeRoll<D extends object = Record<string, unknown>> extends Roll {
  constructor(pool: number, data?: D, options?: Roll['options']);
  constructor(formula: string, data?: D, options?: Roll['options']);
  constructor(poolOrFormula: string | number, data?: D, options?: Roll['options']) {
    if (typeof (poolOrFormula) === "number") {
      super(`${poolOrFormula}d6`, data, options)
    } else {
      super(poolOrFormula, data, options);
    }
    ChallengeRoll.CHAT_TEMPLATE = "systems/sta-ng/templates/chat/challenge-roll.hbs";
  }

  public override render(options?: { flavor?: string, template?: string, isPrivate?: boolean }): Promise<string> {
    const successes = this.successes;
    const effects = this.effects;
    const data = {
      pool: this.results.length,
      images: this.resultImages,
      effect: {
        count: effects,
        message: effects > 1 ? game.i18n.format("sta.roll.effectPlural", { count: effects }) : game.i18n.localize("sta.roll.effect")
      },
      success: {
        count: successes,
        message: successes > 1 ? game.i18n.format("sta.roll.successPlural", { count: successes }) : game.i18n.localize("sta.roll.success")
      }
    }
    return renderTemplate(options?.template ?? ChallengeRoll.CHAT_TEMPLATE, data);
  }

  private get effects() {
    return this.results.filter(x => [5, 6].includes(x.result)).length;
  }

  private get results() {
    return (this.terms[0] as Die).results;
  }

  private get resultImages() {
    return this.results.map(x => {
      switch (x.result) {
        case 1:
          return "ChallengeDie_Success1_small.png";
        case 2:
          return "ChallengeDie_Success2_small.png";
        case 5:
        case 6:
          return "ChallengeDie_Effect_small.png";
        default:
          return "ChallengeDie_Success0_small.png";
      }
    });
  }

  private get successes() {
    return this.results.reduce((acc: number, x: DiceTerm.Result) => {
      switch (x.result) {
        case 1:
        case 5:
        case 6:
          return acc + 1;
        case 2:
          return acc + 2;
        default:
          return acc;
      }
    }, 0);
  }
}
