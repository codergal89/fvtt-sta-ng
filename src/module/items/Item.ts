import { STASharedActorFunctions } from '../actors/Actor.js';

export class ItemStaNg extends Item {

  override prepareData(): void {
    super.prepareData();
    if (!this.data.img || this.data.img == "icons/svg/mystery-man.svg") {
      this.data.img = '/systems/sta-ng/assets/icons/voyagercombadgeicon.svg';
    }
  }

  static chatListeners(html: JQuery<HTMLElement>) {
    html.on('click', '.reroll-result.attribute', this._onChatAttributeRerollResult.bind(this));
    html.on('click', '.reroll-result.challenge', this._onChatChallengeRerollResult.bind(this));
  }

  static async _onChatAttributeRerollResult(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const staActor = new STASharedActorFunctions();

    const children = event.currentTarget.children;
    const speaker = game.actors?.find((target) =>
      target.id === children.speakerId.value);

    if (speaker) {
      staActor.rollAttributeTest(event, children.selectedAttribute.value,
        children.selectedAttributeValue.value, children.selectedDiscipline.value,
        children.selectedDisciplineValue.value, 0, speaker);
    }
  }

  static async _onChatChallengeRerollResult(event: JQuery.TriggeredEvent) {
    event.preventDefault();
    const staActor = new STASharedActorFunctions();

    const currentChildren = event.currentTarget.children;
    const speaker = game.actors?.find((target) =>
      target.id === currentChildren.speakerId.value);

    if (speaker) {
      staActor.rollChallengeRoll(event, "", 0, speaker);
    }
  }
}
