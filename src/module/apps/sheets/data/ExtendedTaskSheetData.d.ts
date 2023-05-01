interface ExtendedTaskTrackMixIn {
  progress: {
    limit: number
    rows: {
      id: number
      label: number
      selected: boolean
    }[][]
  }
}

type ExtendedTaskSheetData = ActorSheet.Data & ExtendedTaskTrackMixIn
