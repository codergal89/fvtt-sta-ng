/**
 * The base for all actor documents.
 *
 * @property {ActorDataStaNg} system -
 */
export class BaseActorStaNg extends Actor {
  constructor(data, context = {}) {
    if (context.StaNg?.constructorResolved) {
      super(data, context);
    } else {
      Object.assign(context, { StaNg: { constructorResolved: true } });
      const selectedConstructor = game.StaNg.documents.actors.classes[data.type] ?? BaseActorStaNg;
      // eslint-disable-next-line no-constructor-return
      return new selectedConstructor(data, context);
    }
  }

  static getDefaultArtwork(actorData) {
    const combadgeIcon = "systems/sta-ng/assets/icons/svg/combadge_voyager.svg";
    return { img: combadgeIcon, texture: { src: combadgeIcon } };
  }

  isAcceptableItemType(type) {
    return this._acceptableItemTypes.includes(type);
  }

  get _acceptableItemTypes() {
    return [];
  }
}
