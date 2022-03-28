import { ActorStaNg } from "./actors/Entity"
import { ItemStaNg } from "./items/Entity";
import { ItemDataSource as ItemDataSourceFoundry } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/itemData";

declare global {
  interface LenientGlobalVariableTypes {
    game: never;
    ui: never;
  }

  interface Game {
    "sta-ng": {
      applications: Record<string, unknown>
      entities: Record<string, unknown>
    }
  }

  interface SourceConfig {
    Actor: CharacterDataSource
    | ExtendedTaskDataSource
    | SmallCraftDataSource
    | StarshipDataSource

    Item: ArmorDataSource
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
    Actor: CharacterDataProperties
    | ExtendedTaskDataProperties
    | SmallCraftDataProperties
    | StarshipDataProperties

    Item: ArmorDataProperties
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

  interface DocumentClassConfig {
    Actor: typeof ActorStaNg
    Item: typeof ItemStaNg
  }

  namespace ClientSettings {
    interface Values {
      "sta-ng.multipleComplications": boolean
      "sta-ng.momentumPermissionLevel": 0 | 1 | 2 | 3 | 4
      "sta-ng.threatPermissionLevel": 0 | 1 | 2 | 3 | 4
      "sta-ng.maxNumberOfReputation": number
      "sta-ng.threat": number
      "sta-ng.momentum": number,
      "sta-ng.hideThreatFromPlayers": boolean,
    }
  }
}
