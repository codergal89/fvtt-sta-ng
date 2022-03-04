import { ActorStaNg } from "../actors/Actor.js";
import { ItemStaNg } from "../items/Item.js";
import { ChallengeRoll } from "./ChallengeRoll.js";
import { TaskRoll } from "./TaskRoll.js";

export { ChallengeRoll } from "./ChallengeRoll.js";
export { TaskRoll } from "./TaskRoll.js"

type CharacterActor = ActorStaNg & { data: { type: "character" } };
type CharacterWeapon = ItemStaNg & { data: { type: "characterweapon" } };

/**
 * Perform a challenge roll (d6).
 * 
 * @param actor The actor performing the roll
 * @param item The item to roll a challenge for
 * @param options Additional options for the roll
 * @returns 
 */
export async function challengeRoll(actor: ActorStaNg, item: ItemStaNg | null, options: ChallengeRoll.Options) {
  mergeObject(options, { actor: actor.id, item: item?.id }, { overwrite: false });
  if (!item) {
    return genericChallengeRoll(actor, options);
  } else if (actor.data.type === "character" && item.data.type == "characterweapon") {
    return characterWeaponChallengeRoll(actor as CharacterActor, item as CharacterWeapon, options)
  }
  return Promise.reject();
}

/**
 * Perform a task roll (d20).
 * 
 * @param actor The actor performing the roll
 * @param options The configuration for the roll
 * @returns 
 */
export async function taskRoll(actor: ActorStaNg, options: TaskRoll.Options) {
  mergeObject(options, { actor: actor.id }, { overwrite: false });
  const roll = new TaskRoll(options.pool, actor.getRollData(), options);

  if (options.usesDetermination && actor.data.type === "character") {
    await actor.update({
      data: {
        determination: {
          value: actor.data.data.determination.value - 1,
        }
      }
    });
  }

  return roll.toMessage({
    flavor: game.i18n.localize(`sta.roll.task.flavor.${actor.data.type}`),
    speaker: ChatMessage.getSpeaker({ actor: actor }),
  });
}

function genericChallengeRoll(actor: ActorStaNg, options: ChallengeRoll.Options) {
  const roll = new ChallengeRoll(options.pool, actor.getRollData(), options);
  return roll.toMessage({
    flavor: game.i18n.localize("sta.roll.challenge.generic"),
    speaker: ChatMessage.getSpeaker({ actor: actor })
  });
}

function characterWeaponChallengeRoll(actor: CharacterActor, weapon: CharacterWeapon, options: ChallengeRoll.Options) {
  const roll = new ChallengeRoll(options.pool, actor.getRollData(), options);
  return roll.toMessage({
    flavor: game.i18n.format("sta.roll.challenge.attack", { weapon: weapon.name }),
    speaker: ChatMessage.getSpeaker({ actor: actor }),
  });
}


