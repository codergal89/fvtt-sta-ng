export class ActorStaNg extends Actor {

  public override prepareBaseData(): void {
    if (!this.data.img || this.data.img == "icons/svg/mystery-man.svg") {
      this.data.img = "systems/sta-ng/assets/icons/svg/combadge_voyager.svg"
    }

    this.prepareCharacterBaseData();
  }

  public override prepareDerivedData(): void {
    this.prepareCharacterDerivedData();
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

    Object.entries(characterData.attributes).forEach(([, value]) => ActorStaNg.limitValue(value, 7, 12));
    Object.entries(characterData.disciplines).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 5));
    ActorStaNg.limitValue(characterData.determination, 0, 3);
    characterData.reputation = Math.min(Math.max(characterData.reputation, 0), game.settings.get("sta-ng", "maxNumberOfReputation"))
    characterData.stress.max = attributeData.fitness.value + disciplineData.security.value;
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
