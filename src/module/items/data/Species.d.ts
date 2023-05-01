interface SpeciesDataSourceData extends ItemCommonDataSourceData {
  eras: Era[]
  exampleValue: string
  traitDescription: string
}

interface SpeciesDataSource {
  type: 'species'
  data: SpeciesDataSourceData
}

type SpeciesDataPropertiesData = SpeciesDataSourceData

interface SpeciesDataProperties {
  type: 'species'
  data: SpeciesDataPropertiesData
}
