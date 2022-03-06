import { ItemStaNg } from "../../items/Entity";

declare global {
  interface TrackMixIn {
    determination: {
      limit: number
      track: {
        id: number
        label: number
        selected: boolean
      }[]
    }
    reputation: {
      limit: number
      track: {
        id: number
        label: number
        selected: boolean
      }[]
    }
    stress: {
      limit: number
      track: {
        id: number
        label: number
        selected: boolean
      }[]
    }
  }

  interface ItemMixIn {
    armor: ItemStaNg[]
    focuses: ItemStaNg[]
    injuries: ItemStaNg[]
    other: ItemStaNg[]
    talents: ItemStaNg[]
    values: ItemStaNg[]
    weapons: {
      weapon: ItemStaNg,
      calculatedDamage: number
    }[]
  }

  type CharacterSheetData = ActorSheet.Data & ItemMixIn & TrackMixIn
}