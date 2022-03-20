import { taskRoll } from "../../dice/Index";
import { ItemStaNg } from "../../items/Entity";
import { CraftTaskRollDialog } from "../dialogs/Index";
import { ActorSheetStaNg } from "./ActorSheet";

export class StarshipSheetStaNg extends ActorSheetStaNg<ActorSheet.Options, StarshipSheetData> {

  public static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'actor', 'starship'],
      width: 900,
      height: 910,
      dragDrop: [{
        dragSelector: '.item-list .item',
        dropSelector: null
      }]
    });
  }

  public override async getData(options?: Partial<ActorSheet.Options>): Promise<StarshipSheetData> {
    const data = await super.getData(options);
    if (this.object.data.type !== "starship") {
      return data;
    }

    const actorData = this.object.data;

    data.crew = this.trackDataFor(actorData.data.crew);
    data.power = this.trackDataFor(actorData.data.power);
    data.shields = this.trackDataFor(actorData.data.shields);
    data.damages = actorData.items.filter(x => x.type === "injury");
    data.other = actorData.items.filter(x => x.type === "item");
    data.smallCraft = actorData.items.filter(x => x.type === "smallcraftcontainer");
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
    return ["crew", "power", "shields"];
  }

  protected override async onPerformTask(event: JQuery.TriggeredEvent): Promise<void> {
    event.preventDefault();
    if (this.actor.data.type !== "starship") {
      return Promise.reject();
    }
    const options = await CraftTaskRollDialog.create(this.actor);
    if (options) {
      taskRoll(this.actor, options)
    }

  }

}