import { ActorStaNg } from "../actors/Actor.js";
import { RollDialog } from "../apps/RollDialog.js";
import { ItemStaNg } from "../items/Item.js";
import ChallengeRoll from "./ChallengeRoll.js";

export { default as ChallengeRoll } from "./ChallengeRoll.js";

type CharacterActor = ActorStaNg & { data: { type: "character" } };
type CharacterWeapon = ItemStaNg & { data: { type: "characterweapon" } };

interface Options {
  fastForward?: boolean
  defaultPool?: number
}

/**
 * Perform a challenge roll (d6).
 * 
 * @param actor The actor who is performing the roll
 * @param item The item to roll a challenge for
 * @param options Additional options for the roll
 * @returns 
 */
export async function challengeRoll(actor: ActorStaNg, item?: ItemStaNg, options?: Options) {
  if (!item) {
    return genericChallengeRoll(actor, options);
  } else if (actor.data.type === "character" && item?.data.type === "characterweapon") {
    return characterWeaponChallengeRoll(actor as CharacterActor, item as CharacterWeapon, options)
  }
  return Promise.reject();
}

async function genericChallengeRoll(actor: ActorStaNg, options?: Options) {
  if (options?.fastForward && options.defaultPool !== undefined) {
    const roll = new ChallengeRoll(options.defaultPool, actor.getRollData(), { speaker: actor.id });
    return roll.toMessage({
      flavor: game.i18n.localize("sta.roll.challenge.generic"),
      speaker: ChatMessage.getSpeaker({ actor: actor })
    });
  }

  const formData = await RollDialog.create(false, 0);
  const poolValue = formData?.get("dicePoolValue");
  if (!poolValue) {
    return;
  }

  const pool = parseInt(poolValue.toString());
  if (!pool) {
    return;
  }

  const roll = new ChallengeRoll(pool, actor.getRollData(), { speaker: actor.id });
  return roll.toMessage({
    flavor: game.i18n.localize("sta.roll.challenge.generic"),
    speaker: ChatMessage.getSpeaker({ actor: actor })
  });
}

async function characterWeaponChallengeRoll(actor: CharacterActor, weapon: CharacterWeapon, options?: Options) {
  let pool = options?.defaultPool ?? weapon.data.data.damage + actor.data.data.disciplines.security.value;
  if (!options?.fastForward) {
    const formData = await RollDialog.create(false, pool);
    if (!formData) {
      return;
    }
    pool = parseInt(formData?.get("dicePoolValue")?.toString() ?? `${pool}`);
  }

  const roll = new ChallengeRoll(pool, actor.getRollData(), { speaker: actor.id, item: weapon.id });
  return roll.toMessage({
    flavor: game.i18n.format("sta.roll.challenge.attack", { weapon: weapon.name }),
    speaker: ChatMessage.getSpeaker({ actor: actor }),
  });
}