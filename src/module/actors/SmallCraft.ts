import { ActorStaNg } from "./Actor";

class SmallCraftStaNg extends ActorStaNg {

  public override prepareBaseData(): void {
    super.prepareBaseData();

    const craftData = this.data.data;

    Object.entries(craftData.systems).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 12));
    Object.entries(craftData.departments).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 2));
    craftData.shields.max = Math.floor((craftData.systems.structure.value + craftData.departments.security.value) / 2);
    craftData.power.max = Math.ceil(craftData.systems.engines.value / 2);
  }

  protected override get acceptableItemTypes(): ActorStaNg["acceptableItemTypes"] {
    return [
      "injury",
      "item",
      "starshipweapon",
      "talent",
      "value",
    ];
  }

}

interface SmallCraftStaNg {
  data: ActorStaNg["data"] & { type: "smallcraft" }
}

export {
  SmallCraftStaNg
}
