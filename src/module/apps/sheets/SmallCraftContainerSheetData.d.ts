import { ActorStaNg } from "../../actors/Entity"

declare global {
  interface SmallCraftContainerAvailableCraftsMixIn {
    availableSmallcraft: ActorStaNg[]
  }
  
  type SmallCraftContainerSheetData = ItemSheet.Data & SmallCraftContainerAvailableCraftsMixIn  
}