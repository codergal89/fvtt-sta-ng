export class ExtendedTaskSheetStaNg extends ActorSheet<ActorSheet.Options, ExtendedTaskSheetData> {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'actor', 'extendedtask'],
      width: 500,
      height: 600
    });
  }

  public override get template() {
    return "systems/sta-ng/templates/apps/sheets/extended-task-sheet.hbs";
  }

  public override async getData(options: ActorSheet.Options): Promise<ExtendedTaskSheetData> {
    const data = await super.getData(options);
    const actorData = this.object.data;
    if (actorData.type !== "extendedtask") {
      return data;
    }

    data.progress = {
      limit: actorData.data.work,
      rows: Array.from(Array(Math.ceil(actorData.data.work / 5)).keys()).map(row => {
        const cellsInRow = Math.min(actorData.data.work - 5 * row, 5);
        return Array.from(Array(cellsInRow).keys()).map(cell => ({
          id: 5 * row + cell,
          label: 5 * row + cell + 1,
          selected: (5 * row + cell) < actorData.data.workprogress
        }));
      })
    };

    return data;
  }

  override activateListeners(html: JQuery<HTMLFormElement>) {
    super.activateListeners(html);

    html.find("[id^='progress-'").on("click", this.onClickTrack.bind(this));
  }

  private onClickTrack(event: JQuery.TriggeredEvent) {
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
    this.submit();
  }
}
