import { ExtendedTaskStaNg } from '../../actors/Index';
import { ActorSheetStaNg } from './ActorSheet';

class ExtendedTaskSheetStaNg extends ActorSheetStaNg<ActorSheet.Options, ExtendedTaskSheetData> {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'actor', 'extendedtask'],
      width: 500,
      height: 600,
    });
  }

  public override async getData(options: ActorSheet.Options): Promise<ExtendedTaskSheetData> {
    const data = await super.getData(options);
    const actorData = this.actor.data;

    data.progress = {
      limit: actorData.data.work,
      rows: Array.from(Array(Math.ceil(actorData.data.work / 5)).keys()).map(row => {
        const cellsInRow = Math.min(actorData.data.work - 5 * row, 5);
        return Array.from(Array(cellsInRow).keys()).map(cell => ({
          id: 5 * row + cell,
          label: 5 * row + cell + 1,
          selected: 5 * row + cell < actorData.data.workprogress,
        }));
      }),
    };

    return data;
  }

  override activateListeners(html: JQuery<HTMLFormElement>) {
    super.activateListeners(html);
    html.find("[id^='progress-'").on('click', this.onClickTrack.bind(this));
  }
}

interface ExtendedTaskSheetStaNg {
  get actor(): ExtendedTaskStaNg;
}

export { ExtendedTaskSheetStaNg };
