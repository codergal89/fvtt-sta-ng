interface TalentDataSourceData extends ItemCommonDataSourceData {
  talenttype: {
    typeenum: string
    description: string
    minimum: string
  }
}

interface TalentDataSource {
  type: 'talent'
  data: TalentDataSourceData
}

interface TalentDataProperties {
  type: 'talent'
  data: TalentDataSourceData
}
