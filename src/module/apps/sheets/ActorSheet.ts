export class ActorSheetStaNg<
  Options extends ActorSheet.Options = ActorSheet.Options,
  Data extends object = ActorSheet.Data<Options>> extends ActorSheet<Options, Data> {

  protected onClickTrack(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const target = $(event.currentTarget);
    const trackParent = target.parents(".bar");
    const allBoxes = trackParent.find(".box");
    const selected = trackParent.find(".selected").length;
    const isSelected = target.hasClass("selected");
    const id = parseInt(target.data("id"));

    if (selected < id + 1) {
      allBoxes.slice(selected, id + 1).each((_, e: HTMLElement) => { $(e).addClass("selected"); });
    } else if (isSelected && id + 1 === selected) {
      target.removeClass("selected");
    } else {
      allBoxes.slice(id + 1, allBoxes.length).each((_, e: HTMLElement) => { $(e).removeClass("selected"); });
    }

    const total = trackParent.find<HTMLInputElement>(".total");
    const newValue = trackParent.find(".selected").length;
    total.val(newValue);
    return this.submit();
  }
}