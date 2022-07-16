export class ActorStaNg extends Actor {

  constructor(data: ActorConstructorData, context?: ActorConstructorContext) {
    console.log(data)

    if (context?.StaNg?.constructorResolved) {
      super(data, context);
    } else {
      context = mergeObject(context || {}, { StaNg: { constructorResolved: true } });
      const selectedConstructor = game.StaNg.actors.classes[data!.type] ?? ActorStaNg;
      return new selectedConstructor(data, context);
    }
  }

  public override prepareBaseData(): void {
    if (!this.data.img || this.data.img == "icons/svg/mystery-man.svg") {
      this.data.img = "systems/sta-ng/assets/icons/svg/combadge_voyager.svg"
    }
  }

  /**
   * Check if a given item type can be accepted by this actor.
   * 
   * @param _type - The type of item to check for acceptability.
   * @returns `true` iff. this actor can accept the given item, `false` otherwise.
   */
  public isAcceptableItemType(_type: keyof ActorStaNg["itemTypes"]): boolean {
    return false;
  }

  protected static limitValue(value: { value: number }, min: number, max: number): void {
    value.value = Math.min(Math.max(value.value, min), max);
  }

}
