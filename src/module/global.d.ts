import { ActorStaNg } from "./actors/Actor.js"
import { ItemStaNg } from "./items/Item.js";
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
    Actor: CharacterDataSource | ExtendedTaskDataSource | SmallCraftDataSource | StarshipDataSource
    Item: ArmorDataSource | CharacterWeaponDataSource | FocusDataSource | InjuryDataSource | ItemDataSource | SmallCraftContainerDataSource | StarshipWeaponDataSource | TalentDataSource | ValueDataSource
  }

  interface DataConfig {
    Actor: CharacterDataProperties | ExtendedTaskDataProperties | SmallCraftDataProperties | StarshipDataProperties
    Item: ArmorDataProperties | CharacterWeaponDataProperties | FocusDataProperties | InjuryDataProperties | ItemDataProperties | SmallCraftContainerDataProperties | StarshipWeaponDataProperties | TalentDataProperties | ValueDataProperties
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
      "sta-ng.momentum": number
    }
  }

  namespace DiceSoNice {
    const enum Material {
      Chrome = "chrome",
      Glass = "glass",
      Iridescent = "iridescent",
      Metal = "metal",
      Plastic = "plastic",
      Pristine = "pristine",
      Wood = "wood",
    }
  
    const enum Mode {
      Default = "default",
      Preferred = "preferred",
    }
  
    interface Colorset {
      background?: string
      category: string
      description: string
      edge?: string
      font?: string
      foreground?: string
      material?: Material
      name: string
      outline?: string
      texture?: string | string[]
    }
  
    interface DicePreset {
      bumpMaps?: string[],
      colorset?: string,
      emissive?: string,
      emissiveMaps?: string[],
      font?: string,
      fontScale?: number,
      labels: string[],
      system: string,
      type: string,
      value?: { min: number, max: number },
    }
  
    interface Dice3D {
      /**
       * Add a colorset to the list of available colorsets
       * 
       * @param {Colorset} colorset
       * @param {Mode} mode
       */
      addColorset(colorset: Colorset, mode?: Mode): void
  
      /**
       * Register a new dice preset
       * @param {Object} preset: The informations on the new dice preset (see below)
       * @param {String} (Optional) shape: should be explicit when using a custom die term. 
       *                                   Supported shapes are d2,d4,d6,d8,d10,d12,d14,d16,d20,d24,d30
       */
      addDicePreset(preset: DicePreset, shape?: string): void
  
      /**
       * Register a new system
       * 
       * @param {Object} system 
       * @param {Mode} mode
       */
      addSystem(data: { id: string, name: string }, mode?: Mode): void
    }
  }
}
