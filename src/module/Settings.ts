/**
 * Register out system's settings with the Foundry infrastructure
 */
export function register(): void {
  game.settings.register('sta-ng', 'multipleComplications', {
    name: 'Multiple Complications:',
    hint: 'The rulebook states "Any die which rolled 20 causes a complication". This is slightly unclear and as of Version 8 of the PDF, this is still not clear - likely due to the incredible rarity. Enabling this will allow roles to display "There were x Complications" if multiple 20s are rolled. Disabling will just state a single complication.',
    scope: 'world',
    type: Boolean,
    default: true,
    config: true,
  });

  game.settings.register('sta-ng', 'threatPermissionLevel', {
    name: 'Threat Tracker User Role:',
    hint: 'Who should be allowed to amend the threat tracker?',
    scope: 'world',
    type: Number,
    default: 3,
    config: true,
    choices: {
      [CONST.USER_ROLES.PLAYER]: 'Players',
      [CONST.USER_ROLES.TRUSTED]: 'Trusted Players',
      [CONST.USER_ROLES.ASSISTANT]: 'Assistant Gamemaster',
      [CONST.USER_ROLES.GAMEMASTER]: 'Gamemasters',
    },
  });

  game.settings.register('sta-ng', 'momentumPermissionLevel', {
    name: 'Momentum Tracker User Role:',
    hint: 'Who should be allowed to amend the momentum tracker?',
    scope: 'world',
    type: Number,
    default: 1,
    config: true,
    choices: {
      [CONST.USER_ROLES.PLAYER]: 'Players',
      [CONST.USER_ROLES.TRUSTED]: 'Trusted Players',
      [CONST.USER_ROLES.ASSISTANT]: 'Assistant Gamemaster',
      [CONST.USER_ROLES.GAMEMASTER]: 'Gamemasters',
    },
  });

  game.settings.register('sta-ng', 'maxNumberOfReputation', {
    name: 'Maximum amount of Reputation:',
    hint: 'Max number of reputation that can be given to a character. 10 is default.',
    scope: 'world',
    type: Number,
    default: 10,
    config: true,
  });

  game.settings.register('sta-ng', 'hideThreatFromPlayers', {
    name: 'Hide threat from players:',
    hint: "Don't show the numerical threat value to non-GM players.",
    scope: 'world',
    type: Boolean,
    default: true,
    config: true,
    onChange: () => window.location.reload(),
  });

  game.settings.register('sta-ng', 'threat', {
    scope: 'world',
    type: Number,
    default: 0,
    config: false,
  });

  game.settings.register('sta-ng', 'momentum', {
    scope: 'world',
    type: Number,
    default: 0,
    config: false,
  });
}
