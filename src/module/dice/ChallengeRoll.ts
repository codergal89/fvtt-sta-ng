import { ChallengeDie } from "./ChallengeDie.js";

interface ChallengeRollOptions {
  item?: string | null
  speaker?: string | null
}

export default class ChallengeRoll<D extends object = Record<string, unknown>> extends Roll {
  constructor(pool: number, data?: D, options?: Roll['options'] & ChallengeRollOptions);
  constructor(formula: string, data?: D, options?: Roll['options'] & ChallengeRollOptions);
  constructor(poolOrFormula: string | number, data?: D, options?: Roll['options'] & ChallengeRollOptions) {
    if (typeof (poolOrFormula) === "number") {
      super(`${poolOrFormula}dq`, data, options)
    } else {
      super(poolOrFormula, data, options);
    }
    ChallengeRoll.CHAT_TEMPLATE = "systems/sta-ng/templates/chat/challenge-roll.hbs";
    ChallengeRoll.TOOLTIP_TEMPLATE = "systems/sta-ng/templates/chat/challenge-tooltip.hbs";
  }

  public override async render(): Promise<string> {
    const effects = this.effects;
    const data = mergeObject({
      pool: this.results.length,
      formula: this.formula,
      tooltip: await this.getTooltip(),
      effects: effects,
      successes: this.total,
    }, this.extendedOptions);
    return renderTemplate(ChallengeRoll.CHAT_TEMPLATE, data);
  }

  private get extendedOptions() {
    return this.options as Roll["options"] & ChallengeRollOptions
  }

  private get effects() {
    return this.results.filter(x => [5, 6].includes(x.result)).length;
  }

  private get results() {
    return (this.terms[0] as ChallengeDie).results;
  }
}
