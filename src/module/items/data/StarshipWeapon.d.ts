interface StarshipWeaponDataSourceData extends ItemCommonDataSourceData {
  damage: 0,
  range: string,
  qualities: {
    area: boolean
    calibration: boolean
    dampening: boolean
    devastating: boolean
    hiddenx: number
    highyield: boolean
    persistentx: number
    piercingx: number
    spread: boolean
    versatilex: number
    viciousx: number
  }
}

interface StarshipWeaponDataSource {
  type: "starshipweapon"
  data: StarshipWeaponDataSourceData
}

interface StarshipWeaponDataProperties {
  type: "starshipweapon"
  data: StarshipWeaponDataSourceData
}
