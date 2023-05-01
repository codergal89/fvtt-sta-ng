import { ItemStaNg } from '../../../items/Entity'

declare global {
  interface StarshipTracksMixIn {
    crew: {
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
    shields: {
      limit: number
      track: {
        id: number
        label: number
        selected: boolean
      }[]
    }
  }

  interface StarshipItemsMixIn {
    damages: ItemStaNg[]
    other: ItemStaNg[]
    smallCraft: ItemStaNg[]
    talents: ItemStaNg[]
    values: ItemStaNg[]
    weapons: {
      weapon: ItemStaNg
      calculatedDamage: number
    }[]
  }

  type StarshipSheetData = ActorSheet.Data & StarshipItemsMixIn & StarshipTracksMixIn
}
