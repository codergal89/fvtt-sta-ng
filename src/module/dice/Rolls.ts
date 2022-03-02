import { ActorStaNg } from "../actors/Actor.js";
import { ItemStaNg } from "../items/Item.js";
import ChallengeRoll from "./ChallengeRoll.js";

export { default as ChallengeRoll } from "./ChallengeRoll.js";

type CharacterActor = ActorStaNg & { data: { type: "character" } };
type CharacterWeapon = ItemStaNg & { data: { type: "characterweapon" } };

export async function challengeRoll(actor: ActorStaNg, weapon: ItemStaNg) {
  if (actor.data.type === "character" && weapon.data.type === "characterweapon") {
    return characterChallengeRoll(actor as CharacterActor, weapon as CharacterWeapon)
  }
  return Promise.reject();
}

async function characterChallengeRoll(actor: CharacterActor, weapon: CharacterWeapon) {
  const pool = weapon.data.data.damage + actor.data.data.disciplines.security.value;
  const roll = new ChallengeRoll(pool, actor.getRollData());
  return roll.toMessage({
    flavor: game.i18n.format("sta.roll.challenge.attack", {weapon: weapon.name}),
    speaker: ChatMessage.getSpeaker({ actor: actor }),
  });
}