export class ActorStaNg extends Actor {

  public override prepareBaseData(): void {
    if (!this.data.img || this.data.img == "icons/svg/mystery-man.svg") {
      this.data.img = "systems/sta-ng/assets/icons/svg/combadge_voyager.svg"
    }

    this.prepareCharacterBaseData();
    this.prepareExtendedTaskBaseData();
  }

  public override prepareDerivedData(): void {
    this.prepareCharacterDerivedData();
  }

  public accept(itemData: ItemDataStaNg | ItemDataStaNg[]): {accepted: boolean, reason?: string} {
    if(Array.isArray(itemData)) {
      return itemData.reduce((acc, i) => {
        const itemResult = this.accept(i);
        return itemResult.accepted ? acc : itemResult;
      }, {accepted: true} as {accepted: boolean, reason?: string});
    }
    if(itemData.type === "talent" && itemData.data.talenttype.typeenum === "species" && this.data.type === "character") {
      const species = itemData.data.talenttype.description
      const isSameSpecies = species === this.data.data.species;
      return {accepted: isSameSpecies, reason: isSameSpecies ? undefined : game.i18n.format("sta.actor.character.rejectedItem.talent.species", {species})};
    }
    return {accepted: true};
  }

  /**
   * Prepare the base data for "character" actors
   */
  private prepareCharacterBaseData(): void {
    if (this.data.type !== "character") {
      return;
    }
    const characterData = this.data.data;
    const attributeData = characterData.attributes;
    const disciplineData = characterData.disciplines;

    Object.entries(characterData.attributes).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 12));
    Object.entries(characterData.disciplines).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 5));
    ActorStaNg.limitValue(characterData.determination, 0, characterData.determination.max);
    characterData.reputation = Math.min(Math.max(characterData.reputation, 0), game.settings.get("sta-ng", "maxNumberOfReputation"))
    characterData.stress.max = attributeData.fitness.value + disciplineData.security.value;
  }

  private prepareExtendedTaskBaseData(): void {
    if (this.data.type !== "extendedtask") {
      return;
    }

    const taskData = this.data.data;

    taskData.magnitude = (taskData.magnitude < 0) ? 0 : taskData.magnitude;
    taskData.work = (taskData.work < 0) ? 0 : taskData.work;
    taskData.difficulty = (taskData.difficulty < 0) ? 0 : taskData.difficulty;
    taskData.resistance = (taskData.resistance < 0) ? 0 : taskData.resistance;
  }

  /**
   * Prepare the derived data for "character" actors
   * 
   * This function calculates the derived stats of a player character.
   */
  private prepareCharacterDerivedData(): void {
    if (this.data.type !== "character") {
      return;
    }
    const characterData = this.data.data;

    characterData.focuses = this.data.items.filter(x => x.type === "focus");
  }

  private static limitValue(value: { value: number }, min: number, max: number): void {
    value.value = Math.min(Math.max(value.value, min), max);
  }

}
