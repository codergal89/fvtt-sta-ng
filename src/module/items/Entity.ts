export class ItemStaNg extends Item {

  public override prepareBaseData(): void {
    super.prepareBaseData();

    this.prepareSpeciesBaseData();
  }

  override prepareData(): void {
    super.prepareData();
    if (!this.data.img || this.data.img == "icons/svg/item-bag.svg") {
      this.data.img = 'systems/sta-ng/assets/icons/svg/combadge_voyager.svg';
    }
  }

  private prepareSpeciesBaseData(): void {
    if (this.data.type !== "species") {
      return;
    }

    const itemData = this.data.data;
    itemData.eras = itemData.eras.filter(e => Object.keys(Era).includes(e));
  }

}
