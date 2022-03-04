import { ChallengeDie } from "./ChallengeDie.js";

export namespace ChallengeRoll {
  export interface Options {
    item?: string
    pool: number
    actor?: string
  }
}

export class ChallengeRoll<D extends object = Record<string, unknown>> extends Roll {
  constructor(pool: number, data: D | undefined, options: Roll['options'] & ChallengeRoll.Options);
  constructor(formula: string, data: D | undefined, options: Roll['options'] & ChallengeRoll.Options);
  constructor(poolOrFormula: string | number, data: D | undefined, options: Roll['options'] & ChallengeRoll.Options) {
    if (typeof (poolOrFormula) === "number") {
      super(`${poolOrFormula}d${ChallengeDie.DENOMINATION}`, data, options)
    } else {
      super(poolOrFormula, data, options);
    }
    this.options = options;
    ChallengeRoll.CHAT_TEMPLATE = "systems/sta-ng/templates/chat/challenge-roll.hbs";
    ChallengeRoll.TOOLTIP_TEMPLATE = "systems/sta-ng/templates/chat/challenge-tooltip.hbs";
  }

  public get effects() {
    return this.results.filter(x => [5, 6].includes(x.result)).length;
  }

  public override options: Roll["options"] & ChallengeRoll.Options;

  public get pool() {
    return this.options.pool;
  }

  public get results() {
    return this.terms.flatMap(t => (t as Die).results)
  }

  public override async render(): Promise<string> {
    const data = mergeObject({
      formula: this.formula,
      tooltip: await this.getTooltip(),
      effects: this.effects,
      successes: this.total,
    }, this.options);
    return renderTemplate(ChallengeRoll.CHAT_TEMPLATE, data);
  }
}
