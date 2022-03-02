export class ChallengeDie extends Die {
  constructor(termData: Die.TermData) {
    termData.faces = 6;
    super(termData);
  }

  public static override DENOMINATION = "c";

  public override getResultLabel(result: DiceTerm.Result): string {
    return {
      1: "<img src='systems/sta-ng/assets/icons/dice/die_challenge_success_1.png'/>",
      2: "<img src='systems/sta-ng/assets/icons/dice/die_challenge_success_2.png'/>",
      3: "<img src='systems/sta-ng/assets/icons/dice/die_challenge_success_0.png'/>",
      4: "<img src='systems/sta-ng/assets/icons/dice/die_challenge_success_0.png'/>",
      5: "<img src='systems/sta-ng/assets/icons/dice/die_challenge_success_1effect.png'/>",
      6: "<img src='systems/sta-ng/assets/icons/dice/die_challenge_success_1effect.png'/>",
    }[result.result] || "";
  }

  override get total(): number | null {
    return this.results.reduce((acc, x) => {
      switch (x.result) {
        case 1:
        case 2:
          return acc + x.result;
        case 5:
        case 6:
          return acc + 1;
        default:
          return acc;
      }
    }, 0);
  }
}
