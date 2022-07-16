import { ActorStaNg } from "../actors/Index";
import { ItemStaNg } from "../items/Entity";
import { ChallengeDie } from "./ChallengeDie";
import { ChallengeRoll } from "./ChallengeRoll";
import { TaskDie } from "./TaskDie";
import { TaskRoll } from "./TaskRoll";

export {
  ChallengeDie,
  ChallengeRoll,
  TaskDie,
  TaskRoll,
};

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
  } else if (["character", "smallcraft", "starship"].includes(actor.data.type)
    && ["characterweapon", "starshipweapon"].includes(item.data.type)) {
    return weaponChallengeRoll(actor, item, options)
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

function weaponChallengeRoll(actor: ActorStaNg, weapon: ItemStaNg, options: ChallengeRoll.Options) {
  const roll = new ChallengeRoll(options.pool, actor.getRollData(), options);
  return roll.toMessage({
    flavor: game.i18n.format("sta.roll.challenge.attack", { weapon: weapon.name }),
    speaker: ChatMessage.getSpeaker({ actor: actor }),
  });
}


