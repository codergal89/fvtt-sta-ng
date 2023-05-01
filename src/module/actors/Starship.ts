import { ActorStaNg } from './Actor';

class StarshipStaNg extends ActorStaNg {
  public override prepareBaseData(): void {
    super.prepareBaseData();

    const craftData = this.data.data;

    Object.entries(craftData.systems).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 12));
    Object.entries(craftData.departments).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 5));
    craftData.shields.max = craftData.systems.structure.value + craftData.departments.security.value;
    craftData.power.max = craftData.systems.engines.value;
    craftData.crew.max = craftData.scale;
    craftData.resistance = craftData.scale;
  }

  protected override get acceptableItemTypes(): ActorStaNg['acceptableItemTypes'] {
    return ['injury', 'item', 'smallcraftcontainer', 'starshipweapon', 'talent', 'value'];
  }
}

interface StarshipStaNg {
  data: ActorStaNg['data'] & { type: 'starship' };
}

export { StarshipStaNg };
