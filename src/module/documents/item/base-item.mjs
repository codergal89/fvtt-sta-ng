/**
 * The base for all actor documents.
 *
 * @property {CommonItemDataStaNg} system -
 */
export class BaseItemStaNg extends Item {
  constructor(data, context = {}) {
    if (context.StaNg?.constructorResolved) {
      super(data, context);
    } else {
      Object.assign(context, { StaNg: { constructorResolved: true } });
      const selectedConstructor = game.StaNg.documents.items.classes[data.type] ?? BaseItemStaNg;
      // eslint-disable-next-line no-constructor-return
      return new selectedConstructor(data, context);
    }
  }

  static getDefaultArtwork(itemData) {
    const combadgeIcon = "systems/sta-ng/assets/icons/svg/combadge_voyager.svg";
    return { img: combadgeIcon, texture: { src: combadgeIcon } };
  }
}
