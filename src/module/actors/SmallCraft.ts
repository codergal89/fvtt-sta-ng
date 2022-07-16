import { ActorStaNg } from "./Actor";

class SmallCraftStaNg extends ActorStaNg {

  constructor(data: ActorConstructorData, context: ActorConstructorContext) {
    super(data, context)
  }

  public override isAcceptableItemType(type: keyof ActorStaNg["itemTypes"]): boolean {
    return ["injury", "item", "starshipweapon", "talent", "value",].includes(type);
  }

  public override prepareBaseData(): void {
    super.prepareBaseData();

    const craftData = this.data.data;

    Object.entries(craftData.systems).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 12));
    Object.entries(craftData.departments).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 2));
    craftData.shields.max = Math.floor((craftData.systems.structure.value + craftData.departments.security.value) / 2);
    craftData.power.max = Math.ceil(craftData.systems.engines.value / 2);
  }

}

interface SmallCraftStaNg {
  data: ActorStaNg["data"] & { type: "smallcraft" }
}

export {
  SmallCraftStaNg
}
