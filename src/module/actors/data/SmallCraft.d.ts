interface SmallCraftDataSourceData extends ActorCommonDataSourceData, CommonCraftDataSourceData {
  missionprofile: string
  parent: string
  power: {
    value: number
  }
  resistance: number
  scale: number
  shields: {
    value: number
  }
  spaceframe: string
  traits: string
}

interface SmallCraftDataSource {
  type: 'smallcraft'
  data: SmallCraftDataSourceData
}

interface SmallCraftDataPropertiesData extends SmallCraftDataSourceData {
  shields: {
    max: number
    value: number
  }
  power: {
    max: number
    value: number
  }
}

interface SmallCraftDataProperties {
  type: 'smallcraft'
  data: SmallCraftDataPropertiesData
}
