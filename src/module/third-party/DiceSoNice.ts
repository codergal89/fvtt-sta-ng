import { ChallengeDie } from '../dice/ChallengeDie';
import { TaskDie } from '../dice/TaskDie';

export const enum Material {
  Chrome = 'chrome',
  Glass = 'glass',
  Iridescent = 'iridescent',
  Metal = 'metal',
  Plastic = 'plastic',
  Pristine = 'pristine',
  Wood = 'wood',
}

export const enum Mode {
  Default = 'default',
  Preferred = 'preferred',
}

export interface Colorset {
  background?: string;
  category: string;
  description: string;
  edge?: string;
  font?: string;
  foreground?: string;
  material?: Material;
  name: string;
  outline?: string;
  texture?: string | string[];
}

export interface DicePreset {
  bumpMaps?: string[];
  colorset?: string;
  emissive?: string;
  emissiveMaps?: string[];
  font?: string;
  fontScale?: number;
  labels: string[];
  system: string;
  type: string;
  value?: { min: number; max: number };
}

export interface Dice3D {
  /**
   * Add a colorset to the list of available colorsets
   *
   * @param {Colorset} colorset
   * @param {Mode} mode
   */
  addColorset(colorset: Colorset, mode?: Mode): void;

  /**
   * Register a new dice preset
   * @param {Object} preset: The informations on the new dice preset (see below)
   * @param {String} (Optional) shape: should be explicit when using a custom die term.
   *                                   Supported shapes are d2,d4,d6,d8,d10,d12,d14,d16,d20,d24,d30
   */
  addDicePreset(preset: DicePreset, shape?: string): void;

  /**
   * Register a new system
   *
   * @param {Object} system
   * @param {Mode} mode
   */
  addSystem(data: { id: string; name: string }, mode?: Mode): void;
}

export function registerUfpThemes(dice3d: Dice3D) {
  [
    {
      background: '#00a3d1',
      category: 'Star Trek Adventures',
      description: game.i18n.localize('sta.dice.dsn.ufp.blue'),
      edge: '#006f8f',
      font: 'FoundryVTT',
      foreground: '#000000',
      material: Material.Plastic,
      name: 'sta-ufp-blue',
      outline: 'none',
    },
    {
      background: '#f7b50c',
      category: 'Star Trek Adventures',
      description: game.i18n.localize('sta.dice.dsn.ufp.gold'),
      edge: '#755400',
      font: 'FoundryVTT',
      foreground: '#000000',
      material: Material.Plastic,
      name: 'sta-ufp-gold',
      outline: 'none',
    },
    {
      background: '#d62100',
      category: 'Star Trek Adventures',
      description: game.i18n.localize('sta.dice.dsn.ufp.red'),
      edge: '#941700',
      font: 'FoundryVTT',
      foreground: '#000000',
      material: Material.Plastic,
      name: 'sta-ufp-red',
      outline: 'none',
    },
  ].forEach(colorset => dice3d.addColorset(colorset, Mode.Default));

  dice3d.addSystem({ id: 'sta-ng-black', name: 'Star Trek Adventures UFP (Black)' }, Mode.Preferred);
  dice3d.addDicePreset({
    type: `d${ChallengeDie.DENOMINATION}`,
    labels: [
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_one_success_black.png',
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_two_successes_black.png',
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_no_success_black.png',
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_no_success_black.png',
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_effect_black.png',
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_effect_black.png',
    ],
    system: 'sta-ng-black',
  });
  dice3d.addDicePreset({
    type: `d${TaskDie.DENOMINATION}`,
    labels: [
      'systems/sta-ng/assets/icons/dice-so-nice/d20_critical_black.png',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
    ],
    system: 'sta-ng-black',
  });

  dice3d.addSystem({ id: 'sta-ng-white', name: 'Star Trek Adventures UFP (White)' });
  dice3d.addDicePreset({
    type: `d${ChallengeDie.DENOMINATION}`,
    labels: [
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_one_success_white.png',
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_two_successes_white.png',
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_no_success_white.png',
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_no_success_white.png',
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_effect_white.png',
      'systems/sta-ng/assets/icons/dice-so-nice/challenge_die_effect_white.png',
    ],
    system: 'sta-ng-white',
  });
  dice3d.addDicePreset({
    type: `d${TaskDie.DENOMINATION}`,
    labels: [
      'systems/sta-ng/assets/icons/dice-so-nice/d20_critical_white.png',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
    ],
    system: 'sta-ng-white',
  });
}
