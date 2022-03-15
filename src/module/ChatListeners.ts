import { ActorStaNg } from "./actors/Entity.js";
import { ChallengeRollDialog, CraftTaskRollDialog, CharacterTaskRollDialog } from "./apps/dialogs/Index.js";
import { challengeRoll, taskRoll } from "./dice/Index.js";
import { ItemStaNg } from "./items/Entity.js";

export function attachChatListeners(html: JQuery<HTMLElement>) {
  html.on('click', '.reroll-result.challenge', onRerollChallenge);
  html.on('click', '.reroll-result.task', onRerollTask);
}

async function onRerollChallenge(event: JQuery.TriggeredEvent) {
  event.preventDefault();
  const actor = getActor(event);
  let pool = getPool(event);
  if (!event.shiftKey) {
    const data = await ChallengeRollDialog.create(pool);
    if (!data) {
      return Promise.reject();
    }
    pool = data.pool;
  }

  return challengeRoll(actor, getItem(event, actor), { pool });
}

async function onRerollTask(event: JQuery.TriggeredEvent) {
  event.preventDefault();
  const actor = getActor(event);
  const config = getTaskConfiguration(event);

  if (!event.shiftKey) {
    if (actor.data.type === "character") {
      const data = await CharacterTaskRollDialog.create(actor, config);
      if (!data) {
        return Promise.reject();
      }
      mergeObject(config, data, {overwrite: true});
    } else if (actor.data.type === "smallcraft" || actor.data.type === "starship") {
      const data = await CraftTaskRollDialog.create(actor, config);
      if(!data) {
        return Promise.reject();
      }
      mergeObject(config, data, {overwrite: true});
    }
  }

  return taskRoll(actor, config);
}

function getActor(event: JQuery.TriggeredEvent): ActorStaNg {
  const actorId = $(event.currentTarget).find<HTMLInputElement>("#actor")[0]?.value;
  const actor = game.actors?.get(actorId);
  if (!actor) {
    throw new Error(game.i18n.localize("sta.error.actorNotFound"));
  }
  return actor;
}

function getItem(event: JQuery.TriggeredEvent, actor: ActorStaNg): ItemStaNg | null {
  const item = $(event.currentTarget).find<HTMLInputElement>("#item")[0]?.value;
  return actor.items.get(item) ?? null;
}

function getPool(event: JQuery.TriggeredEvent): number {
  return parseInt($(event.currentTarget).find<HTMLInputElement>("#pool")[0]?.value);
}

function getTaskConfiguration(event: JQuery.TriggeredEvent) {
  const html = $(event.currentTarget) as JQuery<HTMLDivElement>;

  const actor = html.find<HTMLInputElement>("#actor").val() as string;
  const complicationRange = parseInt(html.find<HTMLInputElement>("#complicationRange").val() as string);
  const hasFocus = html.find<HTMLInputElement>("#hasFocus").val() === "true";
  const score0Key = html.find<HTMLInputElement>("#score0Key").val() as string;
  const score0Label = html.find<HTMLInputElement>("#score0Label").val() as string;
  const score0Value = parseInt(html.find<HTMLInputElement>("#score0Value").val() as string);
  const score1Key = html.find<HTMLInputElement>("#score1Key").val() as string;
  const score1Label = html.find<HTMLInputElement>("#score1Label").val() as string;
  const score1Value = parseInt(html.find<HTMLInputElement>("#score1Value").val() as string);
  const usesDetermination = html.find<HTMLInputElement>("#usesDetermination").val() === "true";

  return {
    actor,
    complicationRange,
    hasFocus,
    pool: getPool(event),
    scores: [{
      key: score0Key,
      label: score0Label,
      value: score0Value,
    }, {
      key: score1Key,
      label: score1Label,
      value: score1Value,
    }],
    usesDetermination
  }
}