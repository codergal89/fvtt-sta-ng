import { SmallCraftStaNg } from "../../actors/Index";
import { taskRoll } from "../../dice/Index";
import { ItemStaNg } from "../../items/Entity";
import { CraftTaskRollDialog } from "../dialogs/Index";
import { ActorSheetStaNg } from "./ActorSheet";

class SmallCraftSheetStaNg extends ActorSheetStaNg<ActorSheet.Options, SmallCraftSheetData> {

  public static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'actor', 'smallcraft'],
      width: 900,
      height: 910,
      dragDrop: [{
        dragSelector: '.item-list .item',
        dropSelector: null
      }]
    });
  }

  public override async getData(options?: Partial<ActorSheet.Options>): Promise<SmallCraftSheetData> {
    const data = await super.getData(options);
    const actorData = this.actor.data;

    data.power = this.trackDataFor(actorData.data.power);
    data.shields = this.trackDataFor(actorData.data.shields);
    data.damages = actorData.items.filter(x => x.type === "injury");
    data.other = actorData.items.filter(x => x.type === "item");
    data.talents = actorData.items.filter(x => x.type === "talent");
    data.values = actorData.items.filter(x => x.type === "value");
    data.weapons = actorData.items.filter(x => x.type === "starshipweapon")
      .map(x => x as ItemStaNg & { data: { type: "starshipweapon" } })
      .map(x => ({
        weapon: x,
        calculatedDamage: x.data.data.damage + actorData.data.departments.security.value,
      }));

    return data;
  }

  protected override get tracks(): string[] {
    return ["power", "shields"];
  }

  protected override async onPerformTask(event: JQuery.TriggeredEvent): Promise<void> {
    event.preventDefault();
    if (this.actor.data.type !== "smallcraft") {
      return Promise.reject();
    }
    const options = await CraftTaskRollDialog.create(this.actor);
    if (options) {
      taskRoll(this.actor, options)
    }
  }

}

interface SmallCraftSheetStaNg {
  get actor(): SmallCraftStaNg
}

export {
  SmallCraftSheetStaNg
}