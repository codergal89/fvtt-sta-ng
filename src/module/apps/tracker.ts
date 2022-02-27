export namespace StaNg.Apps {
  export class Tracker extends Application {
    /**
     * The name of the communication socket used to update the tracker information.
     */
    private static readonly SOCKET: string = "system.sta-ng.tracker";

    /** The momentum + and - buttons. */
    private momentumButtons: HTMLElement[] = []
    /** The momentum value input. */
    private momentumInputField?: HTMLInputElement
    /** The threat + and - buttons. */
    private threatButtons: HTMLElement[] = []
    /** The threat value input. */
    private threatInputField?: HTMLInputElement

    /**
     * Get the limit of the given resource.
     * 
     * @param resource The resource to query the limit of.
     */
    private static getLimit(resource: Tracker.Resource): number {
      return resource === Tracker.Resource.Momentum ? 6 : 99;
    }

    /**
     * Get the value of the given resource.
     * 
     * @param resource The resource to query the value of.
     */
    private static getValue(resource: Tracker.Resource): number {
      return game.settings.get("sta-ng", resource)
    }

    /**
     * Check if the user has the permission to modify the given resource.
     * 
     * @param resource The resource to check the current user's permissions for.
     */
    private static userHasPermissionFor(resource: Tracker.Resource): boolean {
      let requiredLevel = game.settings.get("sta-ng", `${resource}PermissionLevel`);
      return game.user?.hasRole(requiredLevel) || false;
    }

    /**
     * Update the given resource to the given value.
     * 
     * @param resource The resource to modify.
     * @param value The value to set for the given resource.
     */
    private async updateResource(resource: Tracker.Resource, value: number): Promise<void> {
      if (!Tracker.userHasPermissionFor(resource)) {
        ui.notifications.error(game.i18n.localize(`sta.notifications.${resource}InvalidPermissions`));
        return;
      } else if (value < 0) {
        ui.notifications.warn(game.i18n.localize(`sta.notifications.${resource}Negative`));
        return;
      } else if (value > Tracker.getLimit(resource)) {
        ui.notifications.warn(game.i18n.localize(`sta.notifications.${resource}TooGreat`));
        return;
      }

      if (game.user?.isGM) {
        await game.settings.set('sta-ng', resource, value);
        game.socket?.emit(Tracker.SOCKET, new Tracker.UpdateResourceMessage(resource));
        this.update();
      }
      else {
        game.socket?.emit(Tracker.SOCKET, new Tracker.SetResourceMessage(resource, value));
      }
    }

    /**
     * Handle an interaction with the +/- button of the given resource.
     * 
     * @param resource The resource to handle the event for.
     * @param delta The delta applied to the given resource.
     */
    private async onAdjust(resource: Tracker.Resource, delta: -1 | 1): Promise<void> {
      await this.updateResource(resource, Tracker.getValue(resource) + delta);
    }

    /**
     * Handle a value for the given resource being set via the input field.
     * 
     * @param resource The resource to handle the event for.
     * @param value The value to assign to the resource.
     */
    private async onInput(resource: Tracker.Resource, value: number) {
      await this.updateResource(resource, value);
    }

    /**
     * Update the displayed tracker values.
     */
    private update() {
      this.momentumInputField?.setAttribute("value", Tracker.getValue(Tracker.Resource.Momentum).toString());
      this.threatInputField?.setAttribute("value", Tracker.getValue(Tracker.Resource.Threat).toString());
    }

    /**
     * Enable/Disable the momentum and threat +/- buttons and input fields depending on the current user's permissions.
     */
    private configureInterface() {
      if (!Tracker.userHasPermissionFor(Tracker.Resource.Momentum)) {
        this.momentumButtons.forEach(b => b.style.display = "none");
        this.momentumInputField?.setAttribute("disabled", "true");
      }

      if (!Tracker.userHasPermissionFor(Tracker.Resource.Threat)) {
        this.threatButtons.forEach(b => b.style.display = "none");
        this.threatInputField?.setAttribute("disabled", "true");
      }
    }

    /**
     * Attach the event handlers to the momentum and threat +/- buttons
     */
    private configureButtons() {
      $('#sta-momentum-track-decrease > .fas').on("click", (_) => this.onAdjust(Tracker.Resource.Momentum, -1));
      $('#sta-momentum-track-increase > .fas').on("click", (_) => this.onAdjust(Tracker.Resource.Momentum, +1));
      $('#sta-threat-track-decrease > .fas').on("click", (_) => this.onAdjust(Tracker.Resource.Threat, -1));
      $('#sta-threat-track-increase > .fas').on("click", (_) => this.onAdjust(Tracker.Resource.Threat, +1));
    }

    /**
     * Attach the event handler to the momentum and threat input fields
     */
    private configureInputActions() {
      this.momentumInputField?.addEventListener("keydown", (ev: KeyboardEvent) => {
        if (ev.key === "Enter") {
          this.momentumInputField!!.blur();
        }
      });
      this.momentumInputField?.addEventListener("onchange", () => {
        this.onInput(Tracker.Resource.Momentum, this.momentumInputField!!.valueAsNumber);
      });

      this.threatInputField?.addEventListener("keydown", (ev: KeyboardEvent) => {
        if (ev.key === "Enter") {
          this.threatInputField!!.blur();
        }
      });
      this.threatInputField?.addEventListener("onchange", () => {
        this.onInput(Tracker.Resource.Threat, this.threatInputField!!.valueAsNumber);
      });
    }

    /**
     * Configure the actions associated with the tracker's toggle button
     */
    private configureToggleAction() {
      $('#tracker-clickable').on("click", (_) => {
        if ($('.tracker-container:not(.hide)')[0]) {
          $('#tracker-clickable-minus').addClass('hide');
          $('#tracker-clickable-plus').removeClass('hide');
          $('.tracker-container').addClass('hide').removeAttr('style');
        } else {
          $('#tracker-clickable-plus').addClass('hide');
          $('#tracker-clickable-minus').removeClass('hide');
          $('.tracker-container').addClass('hide').removeAttr('style');
          $('.tracker-container').removeClass('hide').width('200px')
        }
      });
    }

    /**
     * Process a message received on the tracker update socket.
     * 
     * @private
     * @param {STATracker.SocketMessage} message The received message.
     */
    private async onMessage(rawMessage: Tracker.Message) {
      switch (rawMessage.type) {
        case Tracker.MessageType.SetResource: {
          let message = rawMessage as Tracker.SetResourceMessage;
          if (game.user?.isGM) {
            await game.settings.set("sta-ng", message.resource, message.value);
            game.socket?.emit(Tracker.SOCKET, new Tracker.UpdateResourceMessage(message.resource));
            this.update();
          }
        }
          break;
        case Tracker.MessageType.UpdateResource: {
          this.update();
        }
      }
    }

    /**
     * The default settings of this application.
     */
    public static override get defaultOptions(): ApplicationOptions {
      let options = super.defaultOptions;
      options.template = 'systems/sta-ng/templates/apps/tracker.html';
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
      )
      this.momentumInputField = html.find('#sta-track-momentum')[0] as HTMLInputElement;

      this.threatButtons.push(
        html.find('#sta-threat-track-decrease')[0],
        html.find('#sta-threat-track-increase')[0]
      )
      this.threatInputField = html.find('#sta-track-threat')[0] as HTMLInputElement;

      game.socket?.on(Tracker.SOCKET, this.onMessage.bind(this));

      this.configureInterface();
      this.configureButtons();
      this.configureInputActions();
      this.configureToggleAction();
      this.update();
    }
  }

  export namespace Tracker {

    /**
     * An enumeration to identify different messages transmitted on the tracker update socket.
     */
    export enum MessageType {
      SetResource,
      UpdateResource,
    }

    /**
     * An enumeration to identify different resources.
     * 
     * The actual representations of the the enumerations values are chosen such that they can be
     * used when concatenating identifiers for localization strings, HTML ids, etc.
     */
    export enum Resource {
      Momentum = "momentum",
      Threat = "threat",
    }

    /**
     * The basic socket message interface.
     */
    export interface Message {
      type: MessageType
    }

    /**
     * A message to set the specified resource to the specified value.
     */
    export class SetResourceMessage implements Message {
      type = MessageType.SetResource
      resource: Resource
      value: number

      constructor(resource: Resource, value: number) {
        this.resource = resource;
        this.value = value
      }
    }

    /**
     * A message to notify receivers that they shall update the specified resource.
     */
    export class UpdateResourceMessage implements Message {
      type = MessageType.UpdateResource;
      resource: Resource

      constructor(resource: Resource) {
        this.resource = resource;
      }
    }
  }
}
