interface SmallCraftContainerDataSourceData extends ItemCommonDataSourceData {
  quantity: number
}

interface SmallCraftContainerDataSource {
  type: "smallcraftcontainer"
  data: SmallCraftContainerDataSourceData
}

interface SmallCraftContainerDataProperties {
  type: "smallcraftcontainer"
  data: SmallCraftContainerDataSourceData
}
