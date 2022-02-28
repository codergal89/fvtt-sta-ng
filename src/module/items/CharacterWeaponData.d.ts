interface CharacterWeaponDataSourceData extends ItemCommonDataSourceData {
  damage: 0,
  range: string,
  hands: number,
  qualities: {
    accurate: boolean
    area: boolean
    charge: boolean
    cumbersome: boolean
    deadly: boolean
    debilitating: boolean
    escalation: number
    grenade: boolean
    hiddenx: number
    inaccurate: boolean
    intense: boolean
    knockdown: boolean
    nonlethal: boolean
    opportunity: number
    piercingx: number
    viciousx: number
  }
}

interface CharacterWeaponDataSource {
  type: "characterweapon"
  data: CharacterWeaponDataSourceData
}

interface CharacterWeaponDataProperties {
  type: "characterweapon"
  data: CharacterWeaponDataSourceData
}
