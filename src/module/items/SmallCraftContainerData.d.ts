interface SmallCraftContainerDataSourceData extends ItemCommonDataSourceData {
  quantity: number
}

interface SmallCraftContainerDataSource {
  type: "smallcraftcontainer"
  data: SmallCraftContainerDataSourceData
}

interface SmallCraftContainerDataPropertiesData extends SmallCraftContainerDataSourceData {
  child: string
}

interface SmallCraftContainerDataProperties {
  type: "smallcraftcontainer"
  data: SmallCraftContainerDataPropertiesData
}
