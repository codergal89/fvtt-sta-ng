import { ActorStaNg } from './actors/Index'
import { ItemStaNg } from './items/Entity'
import { ItemDataSource as ItemDataSourceFoundry } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/itemData'
import { ActorSheetStaNg } from './apps/sheets/ActorSheet'

declare global {
  interface LenientGlobalVariableTypes {
    game: never
    ui: never
  }

  interface Game {
    StaNg: {
      applications: {
        sheets: {
          actors: {
            classes: Record<string, typeof ActorSheetStaNg>
          }
          items: {
            classes: Record<string, typeof ItemSheet>
          }
        }
      }
      documents: {
        actors: {
          classes: Record<string, typeof ActorStaNg>
        }
      }
    }
  }

  interface SourceConfig {
    Actor: CharacterDataSource | ExtendedTaskDataSource | SmallCraftDataSource | StarshipDataSource

    Item:
      | ArmorDataSource
      | CharacterWeaponDataSource
      | FocusDataSource
      | InjuryDataSource
      | ItemDataSource
      | SmallCraftContainerDataSource
      | SpeciesDataSource
      | StarshipWeaponDataSource
      | TalentDataSource
      | ValueDataSource
  }

  interface DataConfig {
    Actor: CharacterDataProperties | ExtendedTaskDataProperties | SmallCraftDataProperties | StarshipDataProperties

    Item:
      | ArmorDataProperties
      | CharacterWeaponDataProperties
      | FocusDataProperties
      | InjuryDataProperties
      | ItemDataProperties
      | SmallCraftContainerDataProperties
      | SpeciesDataProperties
      | StarshipWeaponDataProperties
      | TalentDataProperties
      | ValueDataProperties
  }

  type ItemDataStaNg = ItemDataSourceFoundry

  type ActorConstructorData = ConstructorParameters<typeof Actor>[0]
  type ActorConstructorContext = ConstructorParameters<typeof Actor>[1] & {
    StaNg?: {
      constructorResolved: boolean
    }
  }

  interface DocumentClassConfig {
    Actor: typeof ActorStaNg
    Item: typeof ItemStaNg
  }

  namespace ClientSettings {
    interface Values {
      'sta-ng.multipleComplications': boolean
      'sta-ng.momentumPermissionLevel': 0 | 1 | 2 | 3 | 4
      'sta-ng.threatPermissionLevel': 0 | 1 | 2 | 3 | 4
      'sta-ng.maxNumberOfReputation': number
      'sta-ng.threat': number
      'sta-ng.momentum': number
      'sta-ng.hideThreatFromPlayers': boolean
    }
  }
}
