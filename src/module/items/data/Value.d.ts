interface ValueDataSourceData extends ItemCommonDataSourceData {
  used: boolean
}

interface ValueDataSource {
  type: 'value'
  data: ValueDataSourceData
}

interface ValueDataProperties {
  type: 'value'
  data: ValueDataSourceData
}
