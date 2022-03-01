export function attachChatListeners(html: JQuery<HTMLElement>) {
  html.on('click', '.reroll-result.attribute', onRerollAttribute);
  html.on('click', '.reroll-result.challenge', onRerollChallenge);
}

async function onRerollAttribute(event: JQuery.TriggeredEvent) {
  event.preventDefault();
  const rollSettings = event.currentTarget.children;
  // const attribute = rollSettings.selectedAttribute as (keyof CharacterDataSourceData["attributes"]);
  // const discipline = rollSettings.selectedDiscipline as (keyof CharacterDataSourceData["disciplines"]);
  const actorId = rollSettings.children.speakerId;
  const actor = game.actors?.find(x => x.id == actorId)

  if(actor?.data.type === "character") {
    // const attributeValue = actor.data.data.attributes[attribute].value;
    // const disciplineValue = actor.data.data.disciplines[discipline].value;

  }
}

async function onRerollChallenge(event: JQuery.TriggeredEvent) {
  event.preventDefault();
}


//     <div class="reroll-result attribute">
//         <span>` + game.i18n.format('sta.roll.rerollresults') + `</span>
//         <input id="selectedAttribute" type="hidden" value="` + selectedAttribute + `" >
//         <input id="selectedAttributeValue" type="hidden" value="` + selectedAttributeValue + `" >
//         <input id="selectedDiscipline" type="hidden" value="` + selectedDiscipline + `" >
//         <input id="selectedDisciplineValue" type="hidden" value="` + selectedDisciplineValue + `" >
//         <input id="speakerId" type="hidden" value="` + speaker.id + `" >

// static async _onChatAttributeRerollResult(event: JQuery.TriggeredEvent) {
//   event.preventDefault();
//   const staActor = new STASharedActorFunctions();

//   const children = event.currentTarget.children;
//   const speaker = game.actors?.find((target) =>
//     target.id === children.speakerId.value);

//   if (speaker) {
//     staActor.rollAttributeTest(event, children.selectedAttribute.value,
//       children.selectedAttributeValue.value, children.selectedDiscipline.value,
//       children.selectedDisciplineValue.value, 0, speaker);
//   }
// }

// static async _onChatChallengeRerollResult(event: JQuery.TriggeredEvent) {
//   event.preventDefault();
//   // // const staActor = new STASharedActorFunctions();

//   // const currentChildren = event.currentTarget.children;
//   // const speaker = game.actors?.find((target) =>
//   //   target.id === currentChildren.speakerId.value);

//   // if (speaker) {
//   //   speaker.rollTask("asdf");
//   //   // staActor.rollChallengeRoll(event, "", 0, speaker);
//   // }
// }

// const html = `
// <div class="sta roll attribute">
//     <div class="dice-roll">
//         <div class="dice-result">
//             <div class="dice-formula">
//                 <table class="aim">
//                     <tr>
//                         <td> ` + dicePool + `d20 </td>
//                         <td> Target:` + checkTarget + ` </td>
//                         <td> ` + game.i18n.format('sta.roll.complicationrange') + complicationMinimumValue + `+ </td>
//                         </tr>
//                 </table>
//             </div>
//             <div class="dice-tooltip">
//                 <section class="tooltip-part">
//                     <div class="dice">
//                         <ol class="dice-rolls">` + diceString + `</ol>
//                     </div>
//                 </section>
//             </div>` +
//             complicationText +
//             `<h4 class="dice-total">` + successText + `</h4>
//         </div>
//     </div>
//     <div class="reroll-result attribute">
//         <span>` + game.i18n.format('sta.roll.rerollresults') + `</span>
//         <input id="selectedAttribute" type="hidden" value="` + selectedAttribute + `" >
//         <input id="selectedAttributeValue" type="hidden" value="` + selectedAttributeValue + `" >
//         <input id="selectedDiscipline" type="hidden" value="` + selectedDiscipline + `" >
//         <input id="selectedDisciplineValue" type="hidden" value="` + selectedDisciplineValue + `" >
//         <input id="speakerId" type="hidden" value="` + speaker.id + `" >
//     </div>
// </div>
// `;