/**
 * The base for all actor documents.
 *
 * @property {ActorDataStaNg} system -
 */
export class ActorStaNg extends Actor {
  constructor(data, context = {}) {
    if (context.StaNg?.constructorResolved) {
      super(data, context);
    } else {
      Object.assign(context, { StaNg: { constructorResolved: true } });
      const selectedConstructor = game.StaNg.documents.actors.classes[data.type] ?? ActorStaNg;
      // eslint-disable-next-line no-constructor-return
      return new selectedConstructor(data, context);
    }
  }

  prepareBaseData() {
    if (!this.img || this.img === "icons/svg/mystery-man.svg") {
      this.img = "systems/sta-ng/assets/icons/svg/combadge_voyager.svg";
    }
  }

  isAcceptableItemType(type) {
    return this._acceptableItemTypes.includes(type);
  }

  get _acceptableItemTypes() {
    return [];
  }
}
