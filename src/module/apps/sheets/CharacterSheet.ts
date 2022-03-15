import { taskRoll } from "../../dice/Index.js";
import { CharacterTaskRollDialog } from "../dialogs/CharacterTaskRollDialog.js";
import { ActorSheetStaNg } from "./ActorSheet.js";

export class CharacterSheetStaNg extends ActorSheetStaNg<ActorSheet.Options, CharacterSheetData> {

  public static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'actor', 'character'],
      width: 850,
      height: 910,
      dragDrop: [{
        dragSelector: '.item-list .item',
        dropSelector: null
      }]
    });
  }

  public override async getData(options?: Partial<ActorSheet.Options>): Promise<CharacterSheetData> {
    const data = await super.getData(options);
    if (this.actor.data.type !== "character") {
      return data;
    }
    const actorData = this.actor.data;

    const maximumDetermination = actorData.data.determination.max;
    data.determination = {
      limit: maximumDetermination,
      track: Array.from(Array(maximumDetermination).keys()).map(id => (
        { id: id, label: id + 1, selected: id < actorData.data.determination.value }
      ))
    }

    const maximumReputation = game.settings.get("sta-ng", "maxNumberOfReputation");
    data.reputation = {
      limit: maximumReputation,
      track: Array.from(Array(maximumReputation).keys()).map(id => (
        { id: id, label: id + 1, selected: id < actorData.data.reputation }
      ))
    }

    const maximumStress = actorData.data.stress.max;
    data.stress = {
      limit: maximumStress,
      track: Array.from(Array(maximumStress).keys()).map(id => (
        { id: id, label: id + 1, selected: id < actorData.data.stress.value }
      ))
    }

    data.armor = actorData.items.filter(x => x.type === "armor");
    data.focuses = actorData.items.filter(x => x.type === "focus");
    data.injuries = actorData.items.filter(x => x.type === "injury");
    data.other = actorData.items.filter(x => x.type === "item");
    data.talents = actorData.items.filter(x => x.type === "talent");
    data.values = actorData.items.filter(x => x.type === "value");
    data.weapons = actorData.items.filter(x => x.type === "characterweapon").map(x => ({
      weapon: x,
      // We know that the items a character weapons at this point.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      calculatedDamage: x.data.data.damage + actorData.data.disciplines.security.value
    }))

    return data;
  }

  protected override get tracks(): string[] {
    return ["determination", "reputation", "stress"]
  }

  protected override _onDropItemCreate(itemData: ItemDataStaNg | ItemDataStaNg[]): Promise<Item[]> {
    if (this.actor.data.type === "character") {
      const { accepted, reason } = this.actor.accept(itemData);
      if (!accepted) {
        ui.notifications.error(reason ?? "");
        return Promise.resolve([]);
      }
    }
    return super._onDropItemCreate(itemData);
  }

  protected override activateItemControls(html: JQuery<HTMLElement>): void {
    super.activateItemControls(html);
    html.find(".value-used.toggle").on("click", this.onToggleValue.bind(this));
  }

  private async onToggleValue(event: JQuery.TriggeredEvent): Promise<void> {
    const target = $(event.currentTarget) as JQuery<HTMLElement>;
    const entry = target.parents(".entry");
    const item = this.actor.items.get(entry.data("itemId"));
    if (item && item.data.type === "value") {
      const currentlyUsed = item.data.data.used;
      const currentCssState = currentlyUsed ? "off" : "on";
      const newCssState = currentlyUsed ? "on" : "off";

      target.children()[0].classList.replace(`fa-toggle-${currentCssState}`, `fa-toggle-${newCssState}`);
      target.parents(".entry")[0].setAttribute("data-item-used", `${!currentlyUsed}`);
      target.parents(".entry")[0].style.textDecoration = currentlyUsed ? "line-through" : "none";
      await item.update({ ["data.used"]: !currentlyUsed });
    }
  }

  protected override async onPerformTask(event: JQuery.TriggeredEvent): Promise<void> {
    event.preventDefault();
    if (this.actor.data.type !== "character") {
      return Promise.reject();
    }
    const options = await CharacterTaskRollDialog.create(this.actor);
    if (options) {
      taskRoll(this.actor, options)
    }
  }

}