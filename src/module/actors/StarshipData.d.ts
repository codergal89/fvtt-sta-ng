interface StarshipDataSourceData extends ActorCommonDataSourceData {
  crew: {
    value: number
  }
  departments: {
    command: {
      label: string
      value: number
      seletected: boolean
    }
    conn: {
      label: string
      value: number
      seletected: boolean
    }
    engineering: {
      label: string
      value: number
      seletected: boolean
    }
    medicine: {
      label: string
      value: number
      seletected: boolean
    }
    science: {
      label: string
      value: number
      seletected: boolean
    }
    security: {
      label: string
      value: number
      seletected: boolean
    }
  }
  designation: string
  missionprofile: string
  power: {
    value: number
  }
  refit: string
  resistance: number
  scale: number
  shields: {
    value: number
  }
  servicedate: string
  spaceframe: string
  systems: {
    communications: {
      label: string
      value: number,
      selected: boolean,
      breaches: number
    },
    computers: {
      label: string
      value: number,
      selected: boolean,
      breaches: number
    },
    engines: {
      label: string
      value: number,
      selected: boolean,
      breaches: number
    },
    sensors: {
      label: string
      value: number,
      selected: boolean,
      breaches: number
    },
    structure: {
      label: string
      value: number,
      selected: boolean,
      breaches: number
    },
    weapons: {
      label: string
      value: number,
      selected: boolean,
      breaches: number
    }
  }
  traits: string
}

interface StarshipDataSource {
  type: "starship"
  data: StarshipDataSourceData
}

interface StarshipDataProperties {
  type: "starship"
  data: StarshipDataSourceData
}
