import { ActorStaNg } from "../actors/Actor";
import { ItemStaNg } from "../items/Item";

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