/**
 * Extend a given ItemSheet by adding support for an "Effects" tab
 * 
 * The newly generated type will attach the appropriate event listener to handle the management of
 * ActiveEffect instances on the item being edited.
 * 
 * @param base The type to extends
 * @returns A new ItemSheet type that supports the "Effects" tab
 */
export function EffectsTab<Base extends GenericConstructor<ItemSheet<Options, Data>>,
  Options extends ItemSheet.Options,
  Data extends object,
  >(base: Base) {
  return class Tab extends base {
    public override activateListeners(html: JQuery<HTMLElement>): void {
      super.activateListeners(html);
      if (this.isEditable) {
        html.find(".effect-control").on("click", this.onClickEffectControl.bind(this));
      }
    }

    private async onClickEffectControl(event: JQuery.TriggeredEvent) {
      event.preventDefault();
      const target = $(event.currentTarget);
      const action = target.data("action");
      const effectId = target.closest("li").data("effectId");
      const effect = this.item.effects.get(effectId);

      switch (action) {
        case "create":
          return this.item.createEmbeddedDocuments("ActiveEffect", [{
            label: "New Effect",
            icon: "systems/sta-ng/assets/icons/svg/combadge_voyager.svg",
            origin: this.item.uuid,
            disabled: false,
          }]);
        case "edit":
          return effect?.sheet.render(true);
        case "delete":
          return effect?.delete();
      }

      return Promise.resolve();
    }
  }
}
