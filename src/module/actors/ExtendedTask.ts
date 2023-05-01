import { ActorStaNg } from './Actor';

class ExtendedTaskStaNg extends ActorStaNg {
  public override prepareBaseData(): void {
    super.prepareBaseData();

    const taskData = this.data.data;

    taskData.magnitude = taskData.magnitude < 0 ? 0 : taskData.magnitude;
    taskData.work = taskData.work < 0 ? 0 : taskData.work;
    taskData.difficulty = taskData.difficulty < 0 ? 0 : taskData.difficulty;
    taskData.resistance = taskData.resistance < 0 ? 0 : taskData.resistance;
  }
}

interface ExtendedTaskStaNg {
  data: ActorStaNg['data'] & { type: 'extendedtask' };
}

export { ExtendedTaskStaNg };
