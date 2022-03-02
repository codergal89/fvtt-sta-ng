import { ActorStaNg } from "../actors/Actor.js";
import { RollDialog } from "../apps/RollDialog.js";
import { ItemStaNg } from "../items/Item.js";
import ChallengeRoll from "./ChallengeRoll.js";

export { default as ChallengeRoll } from "./ChallengeRoll.js";

type CharacterActor = ActorStaNg & { data: { type: "character" } };
type CharacterWeapon = ItemStaNg & { data: { type: "characterweapon" } };

export async function challengeRoll(actor: ActorStaNg, weapon?: ItemStaNg, fastForward = false) {
  if (!weapon) {
    return genericChallengeRoll(actor);
  } else if (actor.data.type === "character" && weapon?.data.type === "characterweapon") {
    return characterChallengeRoll(actor as CharacterActor, weapon as CharacterWeapon, fastForward)
  }
  return Promise.reject();
}

async function genericChallengeRoll(actor: ActorStaNg) {
  const formData = await RollDialog.create(false, 0);
  const poolValue = formData?.get("dicePoolValue");
  if (!poolValue) {
    return;
  }

  const pool = parseInt(poolValue.toString());
  if (!pool) {
    return;
  }

  const roll = new ChallengeRoll(pool, actor.getRollData());
  return roll.toMessage({
    flavor: game.i18n.localize("sta.roll.challenge.generic"),
    speaker: ChatMessage.getSpeaker({ actor: actor })
  });
}

async function characterChallengeRoll(actor: CharacterActor, weapon: CharacterWeapon, fastForward: boolean) {
  let pool = weapon.data.data.damage + actor.data.data.disciplines.security.value;

  if (!fastForward) {
    const formData = await RollDialog.create(false, pool);
    if (!formData) {
      return;
    }
    pool = parseInt(formData?.get("dicePoolValue")?.toString() ?? `${pool}`);
  }

  const roll = new ChallengeRoll(pool, actor.getRollData());
  return roll.toMessage({
    flavor: game.i18n.format("sta.roll.challenge.attack", { weapon: weapon.name }),
    speaker: ChatMessage.getSpeaker({ actor: actor }),
  });
}