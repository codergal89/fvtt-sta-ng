/**
 * An enumeration to identify different messages transmitted on the tracker update socket.
 */
enum MessageType {
  SetResource,
  UpdateResource,
}

/**
 * An enumeration to identify different resources.
 *
 * The actual representations of the the enumerations values are chosen such that they can be
 * used when concatenating identifiers for localization strings, HTML ids, etc.
 */
enum Resource {
  Momentum = 'momentum',
  Threat = 'threat',
}

/**
 * The basic socket message interface.
 */
interface Message {
  type: MessageType;
}

/**
 * A message to set the specified resource to the specified value.
 */
class SetResourceMessage implements Message {
  type = MessageType.SetResource;
  resource: Resource;
  value: number;

  constructor(resource: Resource, value: number) {
    this.resource = resource;
    this.value = value;
  }
}

/**
 * A message to notify receivers that they shall update the specified resource.
 */
class UpdateResourceMessage implements Message {
  type = MessageType.UpdateResource;
  resource: Resource;

  constructor(resource: Resource) {
    this.resource = resource;
  }
}

export class ResourceTracker extends Application {
  /**
   * The name of the communication socket used to update the tracker information.
   */
  private static readonly SOCKET: string = 'system.sta-ng';

  /** The momentum + and - buttons. */
  private momentumButtons: HTMLElement[] = [];
  /** The momentum value input. */
  private momentumInputField?: HTMLInputElement;
  /** The threat + and - buttons. */
  private threatButtons: HTMLElement[] = [];
  /** The threat value input. */
  private threatInputField?: HTMLInputElement;

  /**
   * Get the limit of the given resource.
   *
   * @param resource The resource to query the limit of.
   */
  private static getLimit(resource: Resource): number {
    return resource === Resource.Momentum ? 6 : 99;
  }

  /**
   * Get the value of the given resource.
   *
   * @param resource The resource to query the value of.
   */
  private static getValue(resource: Resource): number {
    return game.settings.get('sta-ng', resource);
  }

  /**
   * Check if the user has the permission to modify the given resource.
   *
   * @param resource The resource to check the current user's permissions for.
   */
  private static userHasPermissionFor(resource: Resource): boolean {
    const requiredLevel = game.settings.get('sta-ng', `${resource}PermissionLevel`);
    return game.user?.hasRole(requiredLevel) || false;
  }

  /**
   * Update the given resource to the given value.
   *
   * @param resource The resource to modify.
   * @param value The value to set for the given resource.
   */
  private async updateResource(resource: Resource, value: number): Promise<void> {
    if (!ResourceTracker.userHasPermissionFor(resource)) {
      ui.notifications.error(game.i18n.localize(`sta.notifications.${resource}InvalidPermissions`));
      return;
    } else if (value < 0) {
      ui.notifications.warn(game.i18n.localize(`sta.notifications.${resource}Negative`));
      return;
    } else if (value > ResourceTracker.getLimit(resource)) {
      ui.notifications.warn(game.i18n.localize(`sta.notifications.${resource}TooGreat`));
      return;
    }

    if (game.user?.isGM) {
      await game.settings.set('sta-ng', resource, value);
      game.socket?.emit(ResourceTracker.SOCKET, new UpdateResourceMessage(resource));
      this.update();
    } else {
      game.socket?.emit(ResourceTracker.SOCKET, new SetResourceMessage(resource, value));
    }
  }

  /**
   * Handle an interaction with the +/- button of the given resource.
   *
   * @param resource The resource to handle the event for.
   * @param delta The delta applied to the given resource.
   */
  private async onAdjust(resource: Resource, delta: -1 | 1): Promise<void> {
    await this.updateResource(resource, ResourceTracker.getValue(resource) + delta);
  }

  /**
   * Handle a value for the given resource being set via the input field.
   *
   * @param resource The resource to handle the event for.
   * @param value The value to assign to the resource.
   */
  private async onInput(resource: Resource, value?: number) {
    if (value != null) {
      await this.updateResource(resource, value);
    }
  }

  /**
   * Update the displayed tracker values.
   */
  private update() {
    this.momentumInputField?.setAttribute('value', ResourceTracker.getValue(Resource.Momentum).toString());
    if (
      ResourceTracker.userHasPermissionFor(Resource.Threat) ||
      !game.settings.get('sta-ng', 'hideThreatFromPlayers')
    ) {
      this.threatInputField?.setAttribute('value', ResourceTracker.getValue(Resource.Threat).toString());
    } else {
      this.threatInputField?.setAttribute('type', 'text');
      this.threatInputField?.setAttribute('value', '???');
    }
  }

  /**
   * Enable/Disable the momentum and threat +/- buttons and input fields depending on the current user's permissions.
   */
  private configureInterface() {
    if (!ResourceTracker.userHasPermissionFor(Resource.Momentum)) {
      this.momentumButtons.forEach(b => (b.style.display = 'none'));
      this.momentumInputField?.setAttribute('disabled', 'true');
    }

    if (!ResourceTracker.userHasPermissionFor(Resource.Threat)) {
      this.threatButtons.forEach(b => (b.style.display = 'none'));
      this.threatInputField?.setAttribute('disabled', 'true');
    }
  }

  /**
   * Attach the event handlers to the momentum and threat +/- buttons
   */
  private configureButtons() {
    $('#sta-momentum-track-decrease > .fas').on('click', () => this.onAdjust(Resource.Momentum, -1));
    $('#sta-momentum-track-increase > .fas').on('click', () => this.onAdjust(Resource.Momentum, +1));
    $('#sta-threat-track-decrease > .fas').on('click', () => this.onAdjust(Resource.Threat, -1));
    $('#sta-threat-track-increase > .fas').on('click', () => this.onAdjust(Resource.Threat, +1));
  }

  /**
   * Attach the event handler to the momentum and threat input fields
   */
  private configureInputActions() {
    this.momentumInputField?.addEventListener('keydown', (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') {
        this.momentumInputField?.blur();
      }
    });
    this.momentumInputField?.addEventListener('change', () => {
      this.onInput(Resource.Momentum, this.momentumInputField?.valueAsNumber);
    });

    this.threatInputField?.addEventListener('keydown', (ev: KeyboardEvent) => {
      if (ev.key === 'Enter') {
        this.threatInputField?.blur();
      }
    });
    this.threatInputField?.addEventListener('change', () => {
      this.onInput(Resource.Threat, this.threatInputField?.valueAsNumber);
    });
  }

  /**
   * Configure the actions associated with the tracker's toggle button
   */
  private configureToggleAction() {
    $('#tracker-clickable').on('click', () => {
      if ($('.tracker-container:not(.hide)')[0]) {
        $('#tracker-clickable-minus').addClass('hide');
        $('#tracker-clickable-plus').removeClass('hide');
        $('.tracker-container').addClass('hide').removeAttr('style');
      } else {
        $('#tracker-clickable-plus').addClass('hide');
        $('#tracker-clickable-minus').removeClass('hide');
        $('.tracker-container').addClass('hide').removeAttr('style');
        $('.tracker-container').removeClass('hide').width('200px');
      }
    });
  }

  /**
   * Process a message received on the tracker update socket.
   *
   * @private
   * @param {STATracker.SocketMessage} message The received message.
   */
  private async onMessage(rawMessage: Message) {
    switch (rawMessage.type) {
      case MessageType.SetResource:
        {
          const message = rawMessage as SetResourceMessage;
          if (game.user?.isGM) {
            await game.settings.set('sta-ng', message.resource, message.value);
            game.socket?.emit(ResourceTracker.SOCKET, new UpdateResourceMessage(message.resource));
            this.update();
          }
        }
        break;
      case MessageType.UpdateResource: {
        this.update();
      }
    }
  }

  /**
   * The default settings of this application.
   */
  public static override get defaultOptions(): ApplicationOptions {
    const options = super.defaultOptions;
    options.template = 'systems/sta-ng/templates/apps/resource-tracker.hbs';
    options.popOut = false;
    options.resizable = false;
    return options;
  }

  /**
   * Hookup the application interactivity
   */
  public override activateListeners(html: JQuery<HTMLElement>): void {
    this.momentumButtons.push(
      html.find('#sta-momentum-track-decrease')[0],
      html.find('#sta-momentum-track-increase')[0]
    );
    this.momentumInputField = html.find('#sta-track-momentum')[0] as HTMLInputElement;

    this.threatButtons.push(html.find('#sta-threat-track-decrease')[0], html.find('#sta-threat-track-increase')[0]);
    this.threatInputField = html.find('#sta-track-threat')[0] as HTMLInputElement;

    game.socket?.on(ResourceTracker.SOCKET, this.onMessage.bind(this));

    this.configureInterface();
    this.configureButtons();
    this.configureInputActions();
    this.configureToggleAction();
    this.update();
  }
}
