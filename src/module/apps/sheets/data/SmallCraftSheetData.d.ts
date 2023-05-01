import { ItemStaNg } from '../../../items/Entity'

declare global {
  interface SmallCraftTracksMixIn {
    shields: {
      limit: number
      track: {
        id: number
        label: number
        selected: boolean
      }[]
    }
    power: {
      limit: number
      track: {
        id: number
        label: number
        selected: boolean
      }[]
    }
  }

  interface SmallCraftItemsMixIn {
    damages: ItemStaNg[]
    other: ItemStaNg[]
    talents: ItemStaNg[]
    values: ItemStaNg[]
    weapons: {
      weapon: ItemStaNg
      calculatedDamage: number
    }[]
  }

  type SmallCraftSheetData = ActorSheet.Data & SmallCraftItemsMixIn & SmallCraftTracksMixIn
}
