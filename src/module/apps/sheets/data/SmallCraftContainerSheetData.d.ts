import { ActorStaNg } from '../../../actors/Index'

declare global {
  interface SmallCraftContainerAvailableCraftsMixIn {
    availableSmallcraft: ActorStaNg[]
  }

  type SmallCraftContainerSheetData = ItemSheet.Data & SmallCraftContainerAvailableCraftsMixIn
}
