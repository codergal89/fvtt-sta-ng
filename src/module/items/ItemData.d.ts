interface ItemDataSourceData extends ItemCommonDataSourceData {
  quantity: number
  opportunity: number
  escalation: number
}

interface ItemDataSource {
  type: "item"
  data: ItemDataSourceData
}

interface ItemDataProperties {
  type: "item"
  data: ItemDataSourceData
}
