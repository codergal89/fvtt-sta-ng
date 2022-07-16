export class ActorStaNg extends Actor {

  constructor(data: ActorConstructorData, context?: ActorConstructorContext) {
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

  public isAcceptableItemType(type: keyof ActorStaNg["itemTypes"]): boolean {
    return this.acceptableItemTypes.includes(type);
  }

  protected get acceptableItemTypes(): (keyof ActorStaNg["itemTypes"])[] {
    return [];
  }

  protected static limitValue(value: { value: number }, min: number, max: number): void {
    value.value = Math.min(Math.max(value.value, min), max);
  }

}
