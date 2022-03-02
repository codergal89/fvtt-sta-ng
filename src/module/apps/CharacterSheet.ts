import { sendItemToChat } from "../chat/Item.js";
import { challengeRoll } from "../dice/Rolls.js";
import { ItemStaNg } from "../items/Item.js";
import { CharacterSheetData } from "./CharacterSheetData.js";

export class CharacterSheetStaNg extends ActorSheet<ActorSheet.Options, CharacterSheetData> {

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

  public override get template(): string {
    const sheet = !game.user?.isGM && this.actor.limited ? "limited" : "character";
    return `systems/sta-ng/templates/actors/${sheet}-sheet.hbs`;
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

  public override activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html);

    if ((!game.user?.isGM && !this.actor.isOwner)) {
      return;
    }

    this.activateItemControls(html);
    this.activateTrackControls(html);
    this.activateButtons(html);
  }

  private activateItemControls(html: JQuery<HTMLElement>): void {
    html.find(".control .edit").on("click", this.onEditItem.bind(this));
    html.find(".control .delete").on("click", this.onDeleteItem.bind(this));
    html.find(".control.create").on("click", this.onCreateItem.bind(this));
    html.find(".value-used.toggle").on("click", this.onToggleValue.bind(this));
    html.find(".rollable").on("click", this.onClickRoll.bind(this));
    html.find(".chat").on("click", this.onClickChat.bind(this));
    html.find(".talent-tooltip-clickable").on("click", this.onClickTalentTooltip.bind(this));
  }

  private activateTrackControls(html: JQuery<HTMLElement>): void {
    html.find("[id^='reputation-'").on("click", this.onClickTrack.bind(this));
    html.find("[id^='stress-'").on("click", this.onClickTrack.bind(this));
    html.find("[id^='determination-'").on("click", this.onClickTrack.bind(this));
  }

  private activateButtons(html: JQuery<HTMLElement>): void {
    html.find(".check-button.challenge").on("click", this.onPerformChallenge.bind(this));
  }

  private async onCreateItem(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const dataType = $(event.currentTarget).data("type")
    const item = await this.actor.createEmbeddedDocuments("Item", [{
      name: game.i18n.format("sta.placeholder.item.new", { item: dataType.capitalize() }),
      type: dataType,
      data: {},
      img: "systems/sta-ng/assets/icons/svg/combadge_voyager.svg",
    }]);
    if (!event.shiftKey) {
      this.actor.items.find(x => x.id === item[0].id)?.sheet?.render(true);
    }
  }

  private onEditItem(event: JQuery.TriggeredEvent): void {
    event.preventDefault();
    const [, item] = this.getEventItem(event);
    item?.sheet?.render(true);
  }

  private onDeleteItem(event: JQuery.TriggeredEvent): void {
    event.preventDefault();
    const [listEntry, item] = this.getEventItem(event);
    if (item && (event.shiftKey || confirm(game.i18n.format("sta.confirm.item.delete", { item: item.name })))) {
      listEntry.slideUp(200, () => {
        if (item.id) {
          this.actor.deleteEmbeddedDocuments("Item", [item.id]);
        }
      });
    }
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

  private onClickTrack(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const target = $(event.currentTarget);
    const allBoxes = target.parent().children(".box");
    const selected = target.parent().children(".selected").length;
    const isSelected = target.hasClass("selected");
    const id = parseInt(target.data("id"));

    if (selected < id + 1) {
      allBoxes.slice(selected, id + 1).each((_, e: HTMLElement) => { $(e).addClass("selected"); });
    } else if (isSelected && id + 1 === selected) {
      target.removeClass("selected");
    } else {
      allBoxes.slice(id + 1, allBoxes.length).each((_, e: HTMLElement) => { $(e).removeClass("selected"); });
    }

    const totalReputation = target.parent().find<HTMLInputElement>(".total");
    totalReputation.val(target.parent().children(".selected").length);
    this.submit();
  }

  private async onClickRoll(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const [, item] = this.getEventItem(event);
    if (item) {
      challengeRoll(this.actor, item, {fastForward: event.shiftKey});
    }
  }

  private async onClickChat(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const [, item] = this.getEventItem(event);
    if (item) {
      sendItemToChat(item, this.actor);
    }
  }

  private onClickTalentTooltip(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const [entry, talent] = this.getEventItem(event);
    if (talent?.data.type !== "talent") {
      return;
    }

    const tipContainers = entry.siblings(".talent-tooltip-container");
    const talentTipContainer = tipContainers.filter(`#talent-tooltip-container-${talent.id}`);
    const talentTipIsVisible = !talentTipContainer.hasClass("hide");

    if (talentTipIsVisible) {
      talentTipContainer.removeAttr("style");
    } else {
      talentTipContainer.height(talentTipContainer[0].scrollHeight + 5);
    }
    talentTipContainer.toggleClass("hide")
  }

  private onPerformChallenge(event: JQuery.TriggeredEvent)  {
    event.preventDefault();
    challengeRoll(this.actor);
  }

  private getEventItem(event: JQuery.TriggeredEvent): [JQuery<HTMLElement>, ItemStaNg | undefined] {
    const entry = $(event.currentTarget).parents(".entry");
    return [entry, this.actor.items.get(entry.data("itemId"))];
  }

}