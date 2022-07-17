interface ExtendedTaskDataSourceData extends ActorCommonDataSourceData {
  magnitude: number
  difficulty: number
  work: number
  resistance: number
  breakthroughs: number
  workprogress: number
}

interface ExtendedTaskDataSource {
  type: 'extendedtask'
  data: ExtendedTaskDataSourceData
}

interface ExtendedTaskDataProperties {
  type: 'extendedtask'
  data: ExtendedTaskDataSourceData
}
