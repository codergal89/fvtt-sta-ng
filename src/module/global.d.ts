interface LenientGlobalVariableTypes {
  game: never; // the type doesn't matter
}

interface Game {
  "sta-ng": {
    applications: {}
    entities: {}
  }
}

declare namespace ClientSettings {
  interface Values {
    "sta-ng.multipleComplications": boolean
    "sta-ng.momentumPermissionLevel": string
    "sta-ng.threatPermissionLevel": string
    "sta-ng.maxNumberOfReputation": number
    "sta-ng.threat": number
    "sta-ng.momentum": number
  }
}

declare interface Dice3d {
  addSystem(data: {id: string, name: string}, mode: "preferred" | "default"): void;
}