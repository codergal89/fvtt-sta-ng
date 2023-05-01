import { ActorStaNg } from './Actor';

class CharacterStaNg extends ActorStaNg {
  public accept(itemData: ItemDataStaNg | ItemDataStaNg[]): { accepted: boolean; reason?: string } {
    if (!Array.isArray(itemData)) {
      return this.acceptSingleItem(itemData);
    }
    return itemData.reduce(
      (acc, i) => {
        const result = this.acceptSingleItem(i);
        return result.accepted ? acc : result;
      },
      { accepted: true } as { accepted: boolean, reason?: string }
    );
  }

  public override prepareBaseData(): void {
    super.prepareBaseData();

    const characterData = this.data.data;
    const attributeData = characterData.attributes;
    const disciplineData = characterData.disciplines;

    Object.entries(characterData.attributes).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 12));
    Object.entries(characterData.disciplines).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 5));
    ActorStaNg.limitValue(characterData.determination, 0, characterData.determination.max);
    characterData.reputation = Math.min(
      Math.max(characterData.reputation, 0),
      game.settings.get('sta-ng', 'maxNumberOfReputation')
    );
    characterData.stress.max = attributeData.fitness.value + disciplineData.security.value;
  }

  public override prepareDerivedData(): void {
    super.prepareDerivedData();

    this.data.data.focuses = this.data.items.filter(x => x.type === 'focus');
  }

  protected override get acceptableItemTypes(): ActorStaNg['acceptableItemTypes'] {
    return ['armor', 'characterweapon', 'focus', 'injury', 'item', 'talent', 'value'];
  }

  /**
   * Accept a single item or reject it if it is not applicable to this actor.
   * 
   * @param item An item to accept.
   */
  protected acceptSingleItem(item: ItemDataStaNg): { accepted: boolean, reason?: string } {
    if (item.type === 'talent' && item.data.talenttype.typeenum === 'species') {
      const species = item.data.talenttype.description;
      const isSameSpecies = species === this.data.data.species;
      return {
        accepted: isSameSpecies,
        reason: isSameSpecies
          ? undefined
          : game.i18n.format('sta.actor.character.rejectedItem.talent.species', { species }),
      };
    }
    return { accepted: true };
  }

}

interface CharacterStaNg {
  data: ActorStaNg['data'] & { type: 'character' };
}

export { CharacterStaNg };
