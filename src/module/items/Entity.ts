export class ItemStaNg extends Item {

  override prepareData(): void {
    super.prepareData();
    if (!this.data.img || this.data.img == "icons/svg/item-bag.svg") {
      this.data.img = 'systems/sta-ng/assets/icons/svg/combadge_voyager.svg';
    }
  }

}
