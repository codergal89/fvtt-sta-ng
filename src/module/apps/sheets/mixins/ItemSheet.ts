/**
 * Create a null-mixin as the basis for other ItemSheet mixins
 */
export function ItemSheetStaNg<
  Options extends ItemSheet.Options = ItemSheet.Options,
  Data extends object = ItemSheet.Data<Options>
>() {
  return class Sheet extends ItemSheet<Options, Data> { }
}