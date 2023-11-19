import { ActorStaNg } from "./actor.mjs";

/**
 * The Extended Task document.
 *
 * @property {CharacterDataStaNg} system
 */
export class ExtendedTaskStaNg extends ActorStaNg {
  get _acceptableItemTypes() {
    return [];
  }
}
