export class ItemStaNg extends Item {
  public override prepareBaseData(): void {
    super.prepareBaseData();

    this.prepareSpeciesBaseData();
  }

  override prepareData(): void {
    super.prepareData();
    if (!this.data.img || this.data.img == 'icons/svg/item-bag.svg') {
      this.data.img = 'systems/sta-ng/assets/icons/svg/combadge_voyager.svg';
    }
  }

  public async sendToChat(speaker?: InstanceType<DocumentClassConfig['Actor']>) {
    if (!speaker && this.isEmbedded) {
      speaker = this.parent!;
    }

    const content = await renderTemplate('systems/sta-ng/templates/chat/item.hbs', {
      actor: speaker,
      item: this,
      type: game.i18n.localize(`sta.item.type.${this.data.type}`),
    });

    return ChatMessage.create({
      user: game.user?.id,
      speaker: ChatMessage.getSpeaker({ actor: speaker }),
      content: content,
    });
  }

  private prepareSpeciesBaseData(): void {
    if (this.data.type !== 'species') {
      return;
    }

    const itemData = this.data.data;
    itemData.eras = itemData.eras.filter(e => Object.keys(Era).includes(e));
  }
}
