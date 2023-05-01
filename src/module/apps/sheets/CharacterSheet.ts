import { CharacterStaNg } from '../../actors/Character';
import { taskRoll } from '../../dice/Index';
import { ItemStaNg } from '../../items/Entity';
import { CharacterTaskRollDialog } from '../dialogs/CharacterTaskRollDialog';
import { ActorSheetStaNg } from './ActorSheet';

class CharacterSheetStaNg extends ActorSheetStaNg<ActorSheet.Options, CharacterSheetData> {
  public static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'actor', 'character'],
      width: 850,
      height: 910,
      dragDrop: [
        {
          dragSelector: '.item-list .item',
          dropSelector: null,
        },
      ],
    });
  }

  public override async getData(options?: Partial<ActorSheet.Options>): Promise<CharacterSheetData> {
    const data = await super.getData(options);
    const actorData = this.actor.data;

    data.determination = this.trackDataFor(actorData.data.determination);
    data.reputation = this.trackDataFor({
      max: game.settings.get('sta-ng', 'maxNumberOfReputation'),
      value: actorData.data.reputation,
    });
    // data.stress = this.trackDataFor(actorData.data.stress);
    data.armor = actorData.items.filter(x => x.type === 'armor');
    data.focuses = actorData.items.filter(x => x.type === 'focus');
    data.injuries = actorData.items.filter(x => x.type === 'injury');
    data.other = actorData.items.filter(x => x.type === 'item');
    data.talents = actorData.items.filter(x => x.type === 'talent');
    data.values = actorData.items.filter(x => x.type === 'value');
    data.weapons = actorData.items
      .filter(x => x.type === 'characterweapon')
      .map(x => x as ItemStaNg & { data: { type: 'characterweapon' } })
      .map(x => ({
        weapon: x,
        calculatedDamage: x.data.data.damage + actorData.data.disciplines.security.value,
      }));

    return data;
  }

  protected override get tracks(): string[] {
    return ['determination', 'reputation', 'stress'];
  }

  protected override _onDropItemCreate(itemData: ItemDataStaNg | ItemDataStaNg[]): Promise<ItemStaNg[]> {
    const { accepted, reason } = this.actor.accept(itemData);
    if (!accepted) {
      ui.notifications.error(reason ?? '');
      return Promise.resolve([]);
    }
    return super._onDropItemCreate(itemData);
  }

  protected override activateItemControls(html: JQuery<HTMLElement>): void {
    super.activateItemControls(html);
    html.find('.value-used.toggle').on('click', this.onToggleValue.bind(this));
  }

  private async onToggleValue(event: JQuery.TriggeredEvent): Promise<void> {
    const target = $(event.currentTarget) as JQuery<HTMLElement>;
    const entry = target.parents('.entry');
    const item = this.actor.items.get(entry.data('itemId'));
    if (item && item.data.type === 'value') {
      const currentlyUsed = item.data.data.used;
      const currentCssState = currentlyUsed ? 'off' : 'on';
      const newCssState = currentlyUsed ? 'on' : 'off';

      target.children()[0].classList.replace(`fa-toggle-${currentCssState}`, `fa-toggle-${newCssState}`);
      target.parents('.entry')[0].setAttribute('data-item-used', `${!currentlyUsed}`);
      target.parents('.entry')[0].style.textDecoration = currentlyUsed ? 'line-through' : 'none';
      await item.update({ ['data.used']: !currentlyUsed });
    }
  }

  protected override async onPerformTask(event: JQuery.TriggeredEvent): Promise<void> {
    event.preventDefault();
    const options = await CharacterTaskRollDialog.create(this.actor);
    if (options) {
      taskRoll(this.actor, options);
    }
  }
}

interface CharacterSheetStaNg {
  get actor(): CharacterStaNg;
}

export { CharacterSheetStaNg };
