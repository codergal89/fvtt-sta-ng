import { ActorStaNg } from "../../actors/Actor.js";
import { TaskRoll } from "../../dice/TaskRoll.js";

export class CharacterTaskRollDialog {
  private static readonly TEMPLATE = "systems/sta-ng/templates/apps/dialog-character-task-roll.hbs";

  public static async create(actor: ActorStaNg, preset?: TaskRoll.Options): Promise<TaskRoll.Options | null> {
    if (actor.data.type !== "character") {
      return Promise.reject();
    }

    const config = {
      attributes: actor.data.data.attributes,
      disciplines: actor.data.data.disciplines,
      hasDetermination: actor.data.data.determination.value > 0,
      preset,
    }

    return Dialog.prompt({
      title: game.i18n.localize("sta.apps.task.title"),
      content: await renderTemplate(this.TEMPLATE, config),
      label: game.i18n.localize("sta.apps.rolldice"),
      rejectClose: false,
      callback: (html: JQuery<HTMLElement>) => {
        const hasFocus = html.find("#hasFocus").is(":checked");
        const usesDetermination = html.find("#usesDetermination").is(":checked");
        const complicationRange = html.find<HTMLInputElement>("#complicationRange")[0].valueAsNumber;
        const pool = html.find<HTMLInputElement>("#pool")[0].valueAsNumber;

        const attribute = html.find("#attributeSelector").children("option:selected");
        const discipline = html.find("#disciplineSelector").children("option:selected");

        return {
          actor: actor.id as string,
          scores: [{
            key: attribute.val() as string,
            label: attribute.data("label"),
            value: parseInt(attribute.data("value"))
          }, {
            key: discipline.val() as string,
            label: discipline.data("label"),
            value: parseInt(discipline.data("value"))
          }],
          complicationRange,
          hasFocus,
          pool,
          usesDetermination
        };
      }
    })
  }
}
