import { ItemDataSource } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/itemData';
import { challengeRoll } from '../../dice/Index';
import { ItemStaNg } from '../../items/Entity';
import { ChallengeRollDialog } from '../dialogs/Index';

export class ActorSheetStaNg<
  Options extends ActorSheet.Options = ActorSheet.Options,
  Data extends object = ActorSheet.Data<Options>
> extends ActorSheet<Options, Data> {
  public override get template(): string {
    if (!game.user?.isGM && this.object.limited) {
      return 'systems/sta-ng/templates/apps/sheets/limited-sheet.hbs';
    }
    return `systems/sta-ng/templates/apps/sheets/${this.object.data.type}-sheet.hbs`;
  }

  public override activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html);

    if (!game.user?.isGM && !this.actor.isOwner) {
      return;
    }

    this.activateButtons(html);
    this.activateItemControls(html);
    this.activateTrackControls(html);
  }

  protected override async _onDropItemCreate(itemData: ItemDataSource | ItemDataSource[]): Promise<ItemStaNg[]> {
    if (Array.isArray(itemData)) {
      if (itemData.reduce((acc, x) => acc && this.object.isAcceptableItemType(x.type), false)) {
        return super._onDropItemCreate(itemData);
      }
    } else {
      if (this.object.isAcceptableItemType(itemData.type)) {
        return super._onDropItemCreate(itemData);
      }
    }
    ui.notifications.error(game.i18n.format('sta.actor.character.rejectedItem.type', { name: this.object.name }));
    return Promise.resolve([]);
  }

  protected override _onChangeInput(
    event: JQuery.ChangeEvent<unknown, unknown, unknown, HTMLInputElement>
  ): void | Promise<unknown> {
    if (event.target.type == 'radio') {
      return;
    }
    return super._onChangeInput(event);
  }

  protected get tracks(): string[] {
    return [];
  }

  protected activateButtons(html: JQuery<HTMLElement>): void {
    html.find('.check-button.challenge').on('click', this.onPerformChallenge.bind(this));
    html.find('.check-button.attribute').on('click', this.onPerformTask.bind(this));
  }

  protected activateItemControls(html: JQuery<HTMLElement>): void {
    html.find('.btn.btn-editors.edit').on('click', this.onEditItem.bind(this));
    html.find('.btn2.btn-editors.delete').on('click', this.onDeleteItem.bind(this));
    html.find('.control.create').on('click', this.onCreateItem.bind(this));
    html.find('.rollable').on('click', this.onClickRoll.bind(this));
    html.find('.icon-wp .btn-chat.chat').on('click', this.onClickChat.bind(this));
    html.find('.talent-tooltip-clickable').on('click', this.onClickTalentTooltip.bind(this));
  }

  protected activateTrackControls(html: JQuery<HTMLElement>): void {
    this.tracks.forEach(t => {
      html.find(`[id^='${t}-'`).on('click', this.onClickTrack.bind(this));
    });
  }

  protected trackDataFor(resource: { max: number; value: number }) {
    return {
      limit: resource.max,
      track: Array.from(Array(resource.max).keys()).map(id => ({
        id: id,
        label: id + 1,
        selected: id < resource.value,
      })),
    };
  }

  protected onClickTrack(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const target = $(event.currentTarget);
    const trackParent = target.parents('.bar');
    const allBoxes = trackParent.find('.box');
    const selected = trackParent.find('.selected').length;
    const isSelected = target.hasClass('selected');
    const id = parseInt(target.data('id'));

    if (selected < id + 1) {
      allBoxes.slice(selected, id + 1).each((_, e: HTMLElement) => {
        $(e).addClass('selected');
      });
    } else if (isSelected && id + 1 === selected) {
      target.removeClass('selected');
    } else {
      allBoxes.slice(id + 1, allBoxes.length).each((_, e: HTMLElement) => {
        $(e).removeClass('selected');
      });
    }

    const total = trackParent.find<HTMLInputElement>('.total');
    const newValue = trackParent.find('.selected').length;
    total.val(newValue);
    return this.submit();
  }

  protected async onCreateItem(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const dataType = $(event.currentTarget).data('type');
    const item = await this.actor.createEmbeddedDocuments('Item', [
      {
        name: game.i18n.format('sta.placeholder.item.new', { item: dataType.capitalize() }),
        type: dataType,
        data: {},
        img: 'systems/sta-ng/assets/icons/svg/combadge_voyager.svg',
      },
    ]);
    if (!event.shiftKey) {
      this.actor.items.find(x => x.id === item[0].id)?.sheet?.render(true);
    }
  }

  protected onEditItem(event: JQuery.TriggeredEvent): void {
    event.preventDefault();
    const [, item] = this.getEventItem(event);
    item?.sheet?.render(true);
  }

  protected onDeleteItem(event: JQuery.TriggeredEvent): void {
    event.preventDefault();
    const [listEntry, item] = this.getEventItem(event);
    if (item && (event.shiftKey || confirm(game.i18n.format('sta.confirm.item.delete', { item: item.name })))) {
      listEntry.slideUp(200, () => {
        if (item.id) {
          this.actor.deleteEmbeddedDocuments('Item', [item.id]);
        }
      });
    }
  }

  protected async onClickRoll(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const [, item] = this.getEventItem(event);
    if (this.actor.data.type === 'character' && item?.data.type === 'characterweapon') {
      challengeRoll(this.actor, item, {
        pool: item.data.data.damage + this.actor.data.data.disciplines.security.value,
      });
    } else if (
      (this.actor.data.type === 'smallcraft' || this.actor.data.type === 'starship') &&
      item?.data.type === 'starshipweapon'
    ) {
      challengeRoll(this.actor, item, {
        pool: item.data.data.damage + this.actor.data.data.departments.security.value,
      });
    }
  }

  protected async onClickChat(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const [, item] = this.getEventItem(event);
    item?.sendToChat(this.actor);
  }

  protected onClickTalentTooltip(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const [entry, talent] = this.getEventItem(event);
    if (talent?.data.type !== 'talent') {
      return;
    }

    const tipContainers = entry.siblings('.talent-tooltip-container');
    const talentTipContainer = tipContainers.filter(`#talent-tooltip-container-${talent.id}`);
    const talentTipIsVisible = !talentTipContainer.hasClass('hide');

    if (talentTipIsVisible) {
      talentTipContainer.removeAttr('style');
    } else {
      talentTipContainer.height(talentTipContainer[0].scrollHeight + 5);
    }
    talentTipContainer.toggleClass('hide');
  }

  protected async onPerformChallenge(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const data = await ChallengeRollDialog.create(0);
    if (data) {
      challengeRoll(this.actor, null, data);
    }
  }

  protected onPerformTask(event: JQuery.TriggeredEvent): Promise<void> {
    event.preventDefault();
    return Promise.reject();
  }

  protected getEventItem(event: JQuery.TriggeredEvent): [JQuery<HTMLElement>, ItemStaNg | undefined] {
    const entry = $(event.currentTarget).parents('li');
    return [entry, this.actor.items.get(entry.data('itemId'))];
  }
}
