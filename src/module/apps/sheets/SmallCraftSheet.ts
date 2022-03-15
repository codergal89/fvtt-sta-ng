import { taskRoll } from "../../dice/Index.js";
import { CraftTaskRollDialog } from "../dialogs/Index.js";
import { ActorSheetStaNg } from "./ActorSheet.js";

export class SmallCraftSheetStaNg extends ActorSheetStaNg<ActorSheet.Options, SmallCraftSheetData> {

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
    if (this.object.data.type !== "smallcraft") {
      return data;
    }

    const actorData = this.object.data;

    const maximumPower = actorData.data.power.max;
    data.power = {
      limit: maximumPower,
      track: Array.from(Array(maximumPower).keys()).map(id => (
        { id: id, label: id + 1, selected: id < actorData.data.power.value }
      ))
    }

    const maximumShields = actorData.data.shields.max;
    data.shields = {
      limit: maximumShields,
      track: Array.from(Array(maximumShields).keys()).map(id => (
        { id: id, label: id + 1, selected: id < actorData.data.shields.value }
      ))
    }

    data.damages = actorData.items.filter(x => x.type === "injury");
    data.other = actorData.items.filter(x => x.type === "item");
    data.talents = actorData.items.filter(x => x.type === "talent");
    data.values = actorData.items.filter(x => x.type === "value");
    data.weapons = actorData.items.filter(x => x.type === "starshipweapon").map(x => ({
      weapon: x,
      // We know that the items are starship weapons at this point.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      calculatedDamage: x.data.data.damage + actorData.data.departments.security.value,
    }));

    return data;
  }

  protected override get tracks(): string[] {
    return ["power", "shields"];
  }

  protected override async onPerformTask(event: JQuery.TriggeredEvent): Promise<void> {
    event.preventDefault();
    if (!["smallcraft", "starship"].includes(this.actor.data.type)) {
      return Promise.reject();
    }
    const options = await CraftTaskRollDialog.create(this.actor);
    if (options) {
      taskRoll(this.actor, options)
    }
  }

}
