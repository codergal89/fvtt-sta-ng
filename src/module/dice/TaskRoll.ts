import { TaskDie } from "./TaskDie";

export namespace TaskRoll {
  export interface Options {
    actor: string
    complicationRange: number
    hasFocus: boolean
    pool: number
    scores: {
      key: string,
      label: string,
      value: number,
    }[]
    usesDetermination?: boolean
  }
}

export class TaskRoll<D extends object = Record<string, unknown>> extends Roll {
  constructor(pool: number, data: D | undefined, options: Roll['options'] & TaskRoll.Options);
  constructor(formula: string, data?: D, options?: Roll['options'] & TaskRoll.Options);
  constructor(poolOrFormula: string | number, data: D, options: Roll['options'] & TaskRoll.Options) {
    if (typeof (poolOrFormula) === "number") {
      const formula = `${poolOrFormula}d${TaskDie.DENOMINATION}cf>=${21 - options.complicationRange}cs<=(${options.scores[0].value}+${options.scores[1].value})`;
      super(formula, data, options);
    } else {
      super(poolOrFormula, data, options);
    }
    this.options = options;
    TaskRoll.CHAT_TEMPLATE = "systems/sta-ng/templates/chat/task-roll.hbs"
    TaskRoll.TOOLTIP_TEMPLATE = "systems/sta-ng/templates/chat/challenge-tooltip.hbs";
  }

  public get complications(): number {
    return this.dice[0].results.filter(r => r.result >= 21 - this.options.complicationRange).length;
  }

  public override options: InexactPartial<RollTerm.EvaluationOptions> & TaskRoll.Options;

  public get successes(): number {
    return (this.total ?? 0) + this.dice.reduce((acc, d) => {
      return d.results.filter(r => {
        if (this.options.hasFocus) {
          return r.result <= this.options.scores[1].value;
        }
        return r.result == 1;
      }).length + acc;
    }, 0) + (this.options.usesDetermination ? 2 : 0);
  }

  public get target(): number {
    return this.options.scores[0].value + this.options.scores[1].value
  }

  public override async render(): Promise<string> {
    const data = mergeObject({
      formula: this.formula,
      successes: this.successes,
      complications: this.complications,
      target: this.target,
      tooltip: await this.getTooltip()
    }, this.options)
    return renderTemplate(TaskRoll.CHAT_TEMPLATE, data);
  }
}
