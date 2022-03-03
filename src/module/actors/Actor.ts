import { RollDialog } from "../apps/RollDialog.js";
import { STARoll } from "../roll.js";

declare global {
  interface DocumentClassConfig {
    Actor: typeof ActorStaNg
  }
}


type FirstScore = keyof CharacterDataSourceData["attributes"] | keyof CommonCraftDataSourceData["departments"];
type SecondScore = keyof CharacterDataSourceData["disciplines"] | keyof CommonCraftDataSourceData["systems"];

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ActorStaNg {
  export interface TaskConfiguration {
    firstScore: {
      name: string
      value: number
    }
    secondScore: {
      name: string
      value: number
    }
  }
}

export class ActorStaNg extends Actor {

  public override prepareBaseData(): void {
    if (!this.data.img || this.data.img == "icons/svg/mystery-man.svg") {
      this.data.img = "systems/sta-ng/assets/icons/svg/combadge_voyager.svg"
    }

    this.prepareCharacterBaseData();
  }

  public override prepareDerivedData(): void {
    this.prepareCharacterDerivedData();
  }

  public taskConfiguration(firstScore: FirstScore, secondScore: SecondScore): ActorStaNg.TaskConfiguration | undefined {
    if(this.data.type === "character") {
      return {
        firstScore: {
          name: firstScore.titleCase(),
          value: this.data.data.attributes[firstScore as keyof CharacterDataSourceData["attributes"]].value
        },
        secondScore: {
          name: secondScore.titleCase(),
          value: this.data.data.disciplines[secondScore as keyof CharacterDataSourceData["disciplines"]].value
        }
      }
    } else if (this.data.type === "smallcraft" || this.data.type === "starship") {
      return {
        firstScore: {
          name: firstScore.titleCase(),
          value: this.data.data.departments[firstScore as keyof CommonCraftDataSourceData["departments"]].value
        },
        secondScore: {
          name: secondScore.titleCase(),
          value: this.data.data.systems[secondScore as keyof CommonCraftDataSourceData["systems"]].value
        }
      }
    }
    return;
  }

  /**
   * Prepare the base data for "character" actors
   */
  private prepareCharacterBaseData(): void {
    if (this.data.type !== "character") {
      return;
    }
    const characterData = this.data.data;

    Object.entries(characterData.attributes).forEach(([, value]) => ActorStaNg.limitValue(value, 7, 12));
    Object.entries(characterData.disciplines).forEach(([, value]) => ActorStaNg.limitValue(value, 0, 5));
    ActorStaNg.limitValue(characterData.determination, 0, 3);
    characterData.reputation = Math.min(Math.max(characterData.reputation, 0), game.settings.get("sta-ng", "maxNumberOfReputation"))
  }

  /**
   * Prepare the derived data for "character" actors
   * 
   * This function calculates the derived stats of a player character.
   */
  private prepareCharacterDerivedData(): void {
    if (this.data.type !== "character") {
      return;
    }
    const characterData = this.data.data;
    const attributeData = characterData.attributes;
    const disciplineData = characterData.disciplines;

    characterData.focuses = this.data.items.filter(x => x.type === "focus");
    characterData.stress.max = attributeData.fitness.value + disciplineData.security.value;

    ActorStaNg.limitValue(characterData.stress, 0, characterData.stress.max);
  }

  private static limitValue(value: { value: number }, min: number, max: number): void {
    value.value = Math.min(Math.max(value.value, min), max);
  }

}







/** Shared functions for actors **/
export class STASharedActorFunctions {
  // // This function renders all the tracks. This will be used every time the character sheet is loaded. It is a vital element as such it runs before most other code!
  // staRenderTracks(html: JQuery<HTMLElement>, stressTrackMax: number, determinationPointsMax: number,
  //   repPointsMax: number, shieldsTrackMax: number, powerTrackMax: number, crewTrackMax: number) {
  //   let i;
  //   // Checks if details for the Stress Track was included, this should happen for all Characters!
  //   if (stressTrackMax) {
  //     for (i = 0; i < stressTrackMax; i++) {
  //       html.find('[id^="stress"]')[i].classList.add('stress');
  //       const totalStress = html.find<HTMLInputElement>('#total-stress')[0].value
  //       if (i + 1 <= parseInt(totalStress)) {
  //         html.find('[id^="stress"]')[i].setAttribute('data-selected', 'true');
  //         html.find('[id^="stress"]')[i].classList.add('selected');
  //       } else {
  //         html.find('[id^="stress"]')[i].removeAttribute('data-selected');
  //         html.find('[id^="stress"]')[i].classList.remove('selected');
  //       }
  //     }
  //   }
  //   // Checks if details for the Determination Track was included, this should happen for all Characters!
  //   if (determinationPointsMax) {
  //     for (i = 0; i < determinationPointsMax; i++) {
  //       html.find('[id^="determination"]')[i].classList.add('determination');
  //       const totalDetermination = html.find<HTMLInputElement>('#total-determination')[0].value
  //       if (i + 1 <= parseInt(totalDetermination)) {
  //         html.find('[id^="determination"]')[i].setAttribute('data-selected', 'true');
  //         html.find('[id^="determination"]')[i].classList.add('selected');
  //       } else {
  //         html.find('[id^="determination"]')[i].removeAttribute('data-selected');
  //         html.find('[id^="determination"]')[i].classList.remove('selected');
  //       }
  //     }
  //   }
  //   // Checks if details for the Reputation Track was included, this should happen for all Characters!
  //   if (repPointsMax) {
  //     for (i = 0; i < repPointsMax; i++) {
  //       html.find('[id^="rep"]')[i].classList.add('rep');
  //       const totalReputation = html.find<HTMLInputElement>('#total-rep')[0].value;
  //       if (i + 1 <= parseInt(totalReputation)) {
  //         html.find('[id^="rep"]')[i].setAttribute('data-selected', 'true');
  //         html.find('[id^="rep"]')[i].classList.add('selected');
  //       } else {
  //         html.find('[id^="rep"]')[i].removeAttribute('data-selected');
  //         html.find('[id^="rep"]')[i].classList.remove('selected');
  //       }
  //     }
  //   }
  //   // if this is a starship, it will have shields instead of stress, but will be handled very similarly
  //   if (shieldsTrackMax) {
  //     for (i = 0; i < shieldsTrackMax; i++) {
  //       html.find('[id^="shields"]')[i].classList.add('shields');
  //       const totalShields = html.find<HTMLInputElement>('#total-shields')[0].value;
  //       if (i + 1 <= parseInt(totalShields)) {
  //         html.find('[id^="shields"]')[i].setAttribute('data-selected', 'true');
  //         html.find('[id^="shields"]')[i].classList.add('selected');
  //       } else {
  //         html.find('[id^="shields"]')[i].removeAttribute('data-selected');
  //         html.find('[id^="shields"]')[i].classList.remove('selected');
  //       }
  //     }
  //   }
  //   // if this is a starship, it will have power instead of determination, but will be handled very similarly
  //   if (powerTrackMax) {
  //     for (i = 0; i < powerTrackMax; i++) {
  //       html.find('[id^="power"]')[i].classList.add('power');
  //       const totalPower = html.find<HTMLInputElement>('#total-power')[0].value;
  //       if (i + 1 <= parseInt(totalPower)) {
  //         html.find('[id^="power"]')[i].setAttribute('data-selected', 'true');
  //         html.find('[id^="power"]')[i].classList.add('selected');
  //       } else {
  //         html.find('[id^="power"]')[i].removeAttribute('data-selected');
  //         html.find('[id^="power"]')[i].classList.remove('selected');
  //       }
  //     }
  //   }
  //   // if this is a starship, it will also have crew support level instead of determination, but will be handled very similarly
  //   if (crewTrackMax) {
  //     for (i = 0; i < crewTrackMax; i++) {
  //       html.find('[id^="crew"]')[i].classList.add('crew');
  //       const totalCrew = html.find<HTMLInputElement>('#total-crew')[0].value;
  //       if (i + 1 <= parseInt(totalCrew)) {
  //         html.find('[id^="crew"]')[i].setAttribute('data-selected', 'true');
  //         html.find('[id^="crew"]')[i].classList.add('selected');
  //       } else {
  //         html.find('[id^="crew"]')[i].removeAttribute('data-selected');
  //         html.find('[id^="crew"]')[i].classList.remove('selected');
  //       }
  //     }
  //   }
  // }

  // This handles performing an attribute test using the "Perform Check" button.
  async rollAttributeTest(event: JQuery.Event, selectedAttribute: string, selectedAttributeValue: string,
    selectedDiscipline: string, selectedDisciplineValue: string, defaultValue: number, speaker: ActorStaNg) {
    event.preventDefault();
    if (!defaultValue) defaultValue = 2;
    // This creates a dialog to gather details regarding the roll and waits for a response
    const rolldialog = await RollDialog.create(true, defaultValue);
    if (rolldialog) {
      const dicePool = rolldialog.get('dicePoolSlider');
      const usingFocus = rolldialog.get('usingFocus') == null ? false : true;
      const usingDetermination = rolldialog.get('usingDetermination') == null ? false : true;
      const complicationRange = parseInt(rolldialog.get('complicationRange')?.toString() ?? "0");
      // Once the response has been collected it then sends it to be rolled.
      const staRoll = new STARoll();
      staRoll.performAttributeTest(dicePool, usingFocus, usingDetermination,
        selectedAttribute, selectedAttributeValue, selectedDiscipline,
        selectedDisciplineValue, complicationRange, speaker);
    }
  }

  // This handles performing an challenge roll using the "Perform Challenge Roll" button.
  async rollChallengeRoll(event: JQuery.Event, weaponName: string, defaultValue: number, speaker: ActorStaNg) {
    event.preventDefault();
    // This creates a dialog to gather details regarding the roll and waits for a response
    const rolldialog = await RollDialog.create(false, defaultValue);
    if (rolldialog) {
      const dicePool = rolldialog.get('dicePoolValue');
      // Once the response has been collected it then sends it to be rolled.
      const staRoll = new STARoll();
      staRoll.performChallengeRoll(dicePool, weaponName, speaker);
    }
  }

  // This handles performing an "item" roll by clicking the item's image.
  async rollGenericItem(event: Event, type: string, id: string, speaker: ActorStaNg) {
    event.preventDefault();
    const item = speaker.items.get(id);
    const staRoll = new STARoll();
    // It will send it to a different method depending what item type was sent to it.
    switch (type) {
      case 'item':
        staRoll.performItemRoll(item, speaker);
        break;
      case 'focus':
        staRoll.performFocusRoll(item, speaker);
        break;
      case 'value':
        staRoll.performValueRoll(item, speaker);
        break;
      case 'weapon':
      case 'starshipweapon':
        staRoll.performWeaponRoll(item, speaker);
        break;
      case 'armor':
        staRoll.performArmorRoll(item, speaker);
        break;
      case 'talent':
        staRoll.performTalentRoll(item, speaker);
        break;
      case 'injury':
        staRoll.performInjuryRoll(item, speaker);
        break;
    }
  }
}
