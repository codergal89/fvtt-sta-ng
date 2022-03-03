import { ActorStaNg } from "../actors/Actor.js";
import { TaskDie } from "./TaskDie.js";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TaskRoll {
  export interface Options extends ActorStaNg.TaskConfiguration {
    speaker?: string | null
    complicationLimit: number
    type: string
    hasFocus: boolean
    usesDetermination: boolean
  }
}

export class TaskRoll<D extends object = Record<string, unknown>> extends Roll {
  public override options: InexactPartial<RollTerm.EvaluationOptions> & TaskRoll.Options;

  private get complications(): number {
    return this.dice[0].results.filter(r => r.result >= this.options.complicationLimit).length;
  }

  public get successes(): number {
    return (this.total ?? 0) + this.dice.reduce((acc, d) => {
      return d.results.filter(r => {
        if (this.options.hasFocus) {
          return r.result <= this.options.secondScore.value;
        }
        return r.result == 1;
      }).length + acc;
    }, 0) + (this.options.usesDetermination ? 2 : 0);
  }

  public get target(): number {
    return this.options.firstScore.value + this.options.secondScore.value
  }

  constructor(pool: number, data: D | undefined, options: Roll['options'] & TaskRoll.Options);
  constructor(formula: string, data?: D, options?: Roll['options'] & TaskRoll.Options);
  constructor(poolOrFormula: string | number, data: D, options: Roll['options'] & TaskRoll.Options) {
    if (typeof (poolOrFormula) === "number") {
      const formula = `${poolOrFormula}d${TaskDie.DENOMINATION}cf>=${options.complicationLimit}cs<=(${options.firstScore.value}+${options.secondScore.value})`;
      super(formula, data, options);
    } else {
      super(poolOrFormula, data, options);
    }
    this.options = options;
    TaskRoll.CHAT_TEMPLATE = "systems/sta-ng/templates/chat/task-roll.hbs"
    TaskRoll.TOOLTIP_TEMPLATE = "systems/sta-ng/templates/chat/challenge-tooltip.hbs";
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
