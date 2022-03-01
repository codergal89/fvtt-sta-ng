interface CommonCraftDataSourceData {
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
}