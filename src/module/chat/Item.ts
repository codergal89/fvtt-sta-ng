import { ActorStaNg } from "../actors/Entity.js";
import { ItemStaNg } from "../items/Entity.js";

export async function sendItemToChat(item: ItemStaNg, actor?: ActorStaNg) {
  const content = await renderTemplate("systems/sta-ng/templates/chat/item.hbs", {
    actor: actor,
    item: item,
    type: game.i18n.localize(`sta.item.type.${item.data.type}`)
  });
  return ChatMessage.create({
    user: game.user?.id,
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    content: content,
  });
}