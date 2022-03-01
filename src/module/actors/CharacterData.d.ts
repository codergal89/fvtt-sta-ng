interface CharacterDataSourceData extends ActorCommonDataSourceData {
  assignment: string
  attributes: {
    control: {
      label: string
      value: number
      selected: boolean
    }
    daring: {
      label: string
      value: number
      selected: boolean
    }
    fitness: {
      label: string
      value: number
      selected: boolean
    }
    insight: {
      label: string
      value: number
      selected: boolean
    }
    presence: {
      label: string
      value: number
      selected: boolean
    }
    reason: {
      label: string
      value: number
      selected: boolean
    }
  }
  determination: {
    value: number,
    max: number
  }
  disciplines: {
    command: {
      label: string
      value: number
      selected: boolean
    }
    conn: {
      label: string
      value: number
      selected: boolean
    }
    engineering: {
      label: string
      value: number
      selected: boolean
    }
    medicine: {
      label: string
      value: number
      selected: boolean
    }
    science: {
      label: string
      value: number
      selected: boolean
    }
    security: {
      label: string
      value: number
      selected: boolean
    }
  },
  environment: string
  milestones: string
  rank: string
  reputation: number
  species: string
  stress: {
    value: number
  }
  upbringing: string
}

interface CharacterDataSource {
  type: "character",
  data: CharacterDataSourceData
}

interface CharacterDataPropertiesData extends CharacterDataSourceData {
  focuses: Item[]
  stress: {
    value: number
    max: number
  }
}

interface CharacterDataProperties {
  type: "character"
  data: CharacterDataPropertiesData
}
