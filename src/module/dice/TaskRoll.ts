export class TaskRoll extends Roll {

  static override CHAT_TEMPLATE = "/systems/sta-ng/templates/rolls/task.html";

}


// toMessage<T extends DeepPartial<ConstructorParameters<ConfiguredDocumentClass<typeof ChatMessage>>[0]> = {}>(messageData?: T,  { rollMode, create }?: { rollMode?: keyof CONFIG.Dice.RollModes | 'roll'; create?: true }): Promise<InstanceType<ConfiguredDocumentClass<typeof ChatMessage>> | undefined>;
// toMessage<T extends DeepPartial<ConstructorParameters<ConfiguredDocumentClass<typeof ChatMessage>>[0]> = {}>(messageData: T, { rollMode, create }: { rollMode?: keyof CONFIG.Dice.RollModes | 'roll'; create: false }): MessageData<T>;
// toMessage<T extends DeepPartial<ConstructorParameters<ConfiguredDocumentClass<typeof ChatMessage>>[0]> = {}>(messageData: T, { rollMode, create }: { rollMode?: keyof CONFIG.Dice.RollModes | 'roll'; create: boolean }): Promise<InstanceType<ConfiguredDocumentClass<typeof ChatMessage>> | undefined> | MessageData<T>;