interface CharacterDataSourceData extends ActorCommonDataSourceData {
  assignment: string
  attributes: {
    control: {
      label: string
      value: number
    }
    daring: {
      label: string
      value: number
    }
    fitness: {
      label: string
      value: number
    }
    insight: {
      label: string
      value: number
    }
    presence: {
      label: string
      value: number
    }
    reason: {
      label: string
      value: number
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
    }
    conn: {
      label: string
      value: number
    }
    engineering: {
      label: string
      value: number
    }
    medicine: {
      label: string
      value: number
    }
    science: {
      label: string
      value: number
    }
    security: {
      label: string
      value: number
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
