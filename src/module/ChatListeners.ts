import { ActorStaNg } from "./actors/Actor.js";
import { challengeRoll } from "./dice/Rolls.js";
import { ItemStaNg } from "./items/Item.js";

export function attachChatListeners(html: JQuery<HTMLElement>) {
  html.on('click', '.reroll-result.challenge', onRerollChallenge);
}

async function onRerollChallenge(event: JQuery.TriggeredEvent) {
  event.preventDefault();
  const speaker = getSpeaker(event);
  console.log(getPool(event));
  !speaker || challengeRoll(speaker,
    getItem(event, speaker),
    { fastForward: event.shiftKey, defaultPool: getPool(event) }
  );
}

function getSpeaker(event: JQuery.TriggeredEvent): ActorStaNg | undefined {
  const speaker = $(event.currentTarget).find<HTMLInputElement>("#speaker")[0]?.value;
  return game.actors?.get(speaker);
}

function getItem(event: JQuery.TriggeredEvent, actor: ActorStaNg): ItemStaNg | undefined {
  const item = $(event.currentTarget).find<HTMLInputElement>("#item")[0]?.value;
  return actor.items.get(item);
}

function getPool(event: JQuery.TriggeredEvent): number | undefined {
  const pool = $(event.currentTarget).find<HTMLInputElement>("#pool")[0]?.value;
  return parseInt(pool);
}
