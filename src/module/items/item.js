import {
  STASharedActorFunctions
} from '../actors/actor.js';

export class STAItem extends Item {
  // Augment basic Item data model with additional dynamic data.
  prepareData() {
    if (!this.data.img) this.data.img = '/systems/sta-ng/assets/icons/voyagercombadgeicon.svg';

    super.prepareData();
  }
  
  static chatListeners(html) {
    html.on('click', '.reroll-result.attribute', this._onChatAttributeRerollResult.bind(this));
    html.on('click', '.reroll-result.challenge', this._onChatChallengeRerollResult.bind(this));
  }

  static async _onChatAttributeRerollResult(event) {
    event.preventDefault();
    const staActor = new STASharedActorFunctions();

    const children = event.currentTarget.children;
    const speaker = game.actors.find((target) => 
      target.id === children.speakerId.value);

    staActor.rollAttributeTest(event, children.selectedAttribute.value,
      children.selectedAttributeValue.value, children.selectedDiscipline.value,
      children.selectedDisciplineValue.value, null, speaker);
  }

  static async _onChatChallengeRerollResult(event) {
    event.preventDefault();
    const staActor = new STASharedActorFunctions();

    const currentChildren = event.currentTarget.children;
    const speaker = game.actors.find((target) => 
      target.id === currentChildren.speakerId.value);

    staActor.rollChallengeRoll(event, null, null, speaker);
  }
}
