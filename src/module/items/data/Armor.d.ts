interface ArmorDataSourceData extends ItemCommonDataSourceData {
  protection: number
  equipped: boolean
  opportunity: number
  escalation: number
}

interface ArmorDataSource {
  type: 'armor'
  data: ArmorDataSourceData
}

interface ArmorDataProperties {
  type: 'armor'
  data: ArmorDataSourceData
}
