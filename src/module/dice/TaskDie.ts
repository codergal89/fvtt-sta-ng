export class TaskDie extends Die {
  constructor(termData: Die.TermData) {
    termData.faces = 20;
    super(termData);
  }

  public static override DENOMINATION = "t";

  public override getResultLabel(result: DiceTerm.Result): string {
    return result.result.toString();
  }
}
