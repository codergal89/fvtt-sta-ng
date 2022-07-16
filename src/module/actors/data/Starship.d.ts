interface StarshipDataSourceData extends ActorCommonDataSourceData, CommonCraftDataSourceData {
  crew: {
    value: number
  }
  designation: string
  missionprofile: string
  power: {
    value: number
  }
  refit: string
  resistance: number
  scale: number
  shields: {
    value: number
  }
  servicedate: string
  spaceframe: string
  traits: string
}

interface StarshipDataSource {
  type: "starship"
  data: StarshipDataSourceData
}

interface StarshipDataPropertiesData extends StarshipDataSourceData {
  crew: {
    max: number,
    value: number,
  }
  power: {
    max: number,
    value: number,
  }
  shields: {
    max: number,
    value: number,
  }
}

interface StarshipDataProperties {
  type: "starship"
  data: StarshipDataPropertiesData
}
