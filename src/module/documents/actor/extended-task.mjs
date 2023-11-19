import { BaseActorStaNg } from "./base-actor.mjs";

/**
 * The Extended Task document.
 *
 * @property {CharacterDataStaNg} system
 */
export class ExtendedTaskStaNg extends BaseActorStaNg {
  get _acceptableItemTypes() {
    return [];
  }
}
