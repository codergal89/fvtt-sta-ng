import { ActorStaNg } from "../../actors/Entity";
import { TaskRoll } from "../../dice/TaskRoll";

export class CraftTaskRollDialog {
  private static readonly TEMPLATE = "systems/sta-ng/templates/apps/dialogs/dialog-craft-task-roll.hbs";

  public static async create(actor: ActorStaNg, preset?: TaskRoll.Options): Promise<TaskRoll.Options | null> {
    if (actor.data.type !== "smallcraft" && actor.data.type !== "starship") {
      return Promise.reject();
    }

    const config = {
      systems: actor.data.data.systems,
      departments: actor.data.data.departments,
      preset,
    }

    return Dialog.prompt({
      title: game.i18n.localize("sta.apps.task.title"),
      content: await renderTemplate(this.TEMPLATE, config),
      label: game.i18n.localize("sta.apps.rolldice"),
      rejectClose: false,
      callback: (html: JQuery<HTMLElement>) => {
        const complicationRange = html.find<HTMLInputElement>("#complicationRange")[0].valueAsNumber;
        const pool = html.find<HTMLInputElement>("#pool")[0].valueAsNumber;

        const system = html.find("#systemSelector").children("option:selected");
        const department = html.find("#departmentSelector").children("option:selected");

        return {
          actor: actor.id as string,
          scores: [{
            key: system.val() as string,
            label: system.data("label"),
            value: parseInt(system.data("value"))
          }, {
            key: department.val() as string,
            label: department.data("label"),
            value: parseInt(department.data("value"))
          }],
          complicationRange,
          hasFocus: true,
          pool,
          usesDetermination: false
        };
      }
    })
  }
}
