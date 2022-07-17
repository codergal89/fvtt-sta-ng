interface SmallCraftContainerDataSourceData extends ItemCommonDataSourceData {
  child: string
  quantity: number
}

interface SmallCraftContainerDataSource {
  type: 'smallcraftcontainer'
  data: SmallCraftContainerDataSourceData
}

type SmallCraftContainerDataPropertiesData = SmallCraftContainerDataSourceData

interface SmallCraftContainerDataProperties {
  type: 'smallcraftcontainer'
  data: SmallCraftContainerDataPropertiesData
}
