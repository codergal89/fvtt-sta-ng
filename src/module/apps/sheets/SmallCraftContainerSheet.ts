export class SmallCraftContainerSheetStaNg extends ItemSheet<ItemSheet.Options, SmallCraftContainerSheetData> {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['sta', 'sheet', 'item', 'smallCraftContainer'],
      width: 680,
      height: 320,
      tabs: [{ navSelector: '.tabs', contentSelector: '.sheet-body', initial: 'description' }],
    });
  }

  override get template() {
    return 'systems/sta-ng/templates/apps/sheets/smallcraftcontainer-sheet.hbs';
  }

  public override async getData(options?: Partial<DocumentSheetOptions>): Promise<SmallCraftContainerSheetData> {
    const data = await super.getData(options);

    data.availableSmallcraft =
      game.actors?.filter(a => {
        const isSmallCraft = a.data.type === 'smallcraft';
        const userIsObserver = game.user && a.testUserPermission(game.user, CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER);
        return isSmallCraft && (userIsObserver ?? false);
      }) ?? [];

    return data;
  }
}
