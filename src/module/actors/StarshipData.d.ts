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

interface StarshipDataProperties {
  type: "starship"
  data: StarshipDataSourceData
}
