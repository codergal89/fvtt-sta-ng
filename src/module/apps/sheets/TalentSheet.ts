export class TalentSheetStaNg extends ItemSheet<ItemSheet.Options, TalentSheetData> {
  public static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'item', 'talent'],
      width: 550,
      height: 500,
      tabs: [{ navSelector: '.tabs', contentSelector: '.sheet-body', initial: 'description' }],
    });
  }

  public override get template() {
    return 'systems/sta-ng/templates/apps/sheets/talent-sheet.hbs';
  }

  public override activateListeners(html: JQuery<HTMLElement>): void {
    super.activateListeners(html);
    if (this.isEditable) {
      html.find('.effect-control').on('click', this.onClickEffectControl.bind(this));
    }
  }

  private async onClickEffectControl(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const target = $(event.currentTarget);
    const action = target.data('action');
    const effectId = target.closest('li').data('effectId');
    const effect = this.item.effects.get(effectId);

    switch (action) {
      case 'create':
        return this.item.createEmbeddedDocuments('ActiveEffect', [
          {
            label: 'New Effect',
            icon: 'systems/sta-ng/assets/icons/svg/combadge_voyager.svg',
            origin: this.item.uuid,
            disabled: false,
          },
        ]);
      case 'edit':
        return effect?.sheet?.render(true);
      case 'delete':
        return effect?.delete();
    }

    return Promise.resolve();
  }
}
