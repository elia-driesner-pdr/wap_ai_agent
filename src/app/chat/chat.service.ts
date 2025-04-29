import { Subscription } from 'rxjs';
import { AiRequestService } from '../ai-request.service';

import * as MessageModels from './message-types.model';
import { getAuthTextField, getAuthFailedMessage } from './predefined-messages.model';

export class ChatService {
  private static aiRequestService: AiRequestService;

  private static setSentMessage?: (uid: number, msg: string) => void;
  private static initilizeRecievedMessage?: (uid: number) => void;
  private static cancelGeneration?: (onError: boolean) => void;
  private static setMessageText?: (uid: number, msg: string) => void;
  private static setResponseGenerationState?: (state: boolean) => void;
  private static setWelcomeMessage?: (uid: number, msg: string) => void;
  private static displayElementInChat?: (uid: number, msg: any) => void;

  private static isGenerating: boolean = false;
  private static shouldCancel: boolean = false;

  public static init(aiRequestService: AiRequestService): void {
    this.aiRequestService = aiRequestService;
  }

  public static registerCallbacks({
    setSentMessageFunc,
    initilizeRecievedMessageFunc,
    cancelGenerationFunc,
    setMessageTextFunc,
    setResponseGenerationStateFunc,
    setWelcomeMessageFunc,
    displayElementInChatFunc
  }: {
    setSentMessageFunc: (uid: number, msg: string) => void;
    initilizeRecievedMessageFunc: (uid: number) => void;
    cancelGenerationFunc: (onError: boolean) => void;
    setMessageTextFunc: (uid: number, msg: string) => void;
    setResponseGenerationStateFunc: (state: boolean) => void;
    setWelcomeMessageFunc: (uid: number, msg: string) => void;
    displayElementInChatFunc: (uid: number, msg: any) => void;
  }): void {
    this.setSentMessage = setSentMessageFunc;
    this.initilizeRecievedMessage = initilizeRecievedMessageFunc;
    this.cancelGeneration = cancelGenerationFunc;
    this.setMessageText = setMessageTextFunc;
    this.setResponseGenerationState = setResponseGenerationStateFunc;
    this.setWelcomeMessage = setWelcomeMessageFunc;
    this.displayElementInChat = displayElementInChatFunc;
  }

  public static showWelcomeMessage(): void {
    const uid = this.generateUid();
    const welcomeMsg = 'Hallo, ich bin ein Chatbot von PDR Team. Ich kann dir gerne Auskunft über uns oder deinen Fall geben.';
    this.setWelcomeMessage?.(uid, '');
    this.displayRecievedMessage(uid, welcomeMsg);
  }

  public static setWelcomeMessageFunc(uid: number, msg: string): void {
    this.setWelcomeMessage?.(uid, msg);
  }

  private static cloneInstance<T>(instance: any): any {
    // Create exact copy of instance, if not copied error accurs in TextField
    let onSub = instance.onSubmit;
    instance.onSubmit = null;
    const copy = Object.assign(
      Object.create(Object.getPrototypeOf(instance)),
      structuredClone(instance) // tiefe Kopie der Daten
    );
    instance.onSubmit = onSub;
    copy.onSubmit = onSub;
    copy.uid = this.generateUid();
    return copy;
  }

  public static submitElement(data: any, element? : any) {
    // Handle the return of the workflow
    this.setResponseGenerationState?.(true); // Displays loading animation

    let subscription: Subscription = this.aiRequestService.submitElement(data).subscribe({
      next: (response) => {
        if (!response || response['error']) { // Handle error
          // If element should be displayed again, do so
          if(element) {
            let newElement = this.cloneInstance(element);
            this.insertElementInChat(newElement);
          }
          // Stops loading, displays error message
          this.cancelGeneration?.(true);
          this.isGenerating = false;
          return;
        }

        // Stops loading, displays the response
        this.setResponseGenerationState?.(false);
        if (response['contextId']) {
          this.aiRequestService.setContextId(response['contextId']);
        }

        // Assigns the response to the correct element type
        let responseElement = response['element'];
        switch(response['returnType']) {
          case 'message':
            responseElement = response['element'];
            break;
          case 'textfield':
            responseElement = MessageModels.createTextField(
              response['element'],
              this.generateUid(),
            );
            break;
          case 'optionbuttons':
            responseElement = MessageModels.createOptionButtons(
              response['element'],
              this.generateUid(),
            );
            break;
          case 'bigbuttons':
            responseElement = MessageModels.createBigButtons(
              response['element'],
              this.generateUid(),
            );
            break;
        }
        // If its not a message, re render it on error
        if(response['returnType'] != 'message') {
          responseElement.onSubmit = (data: any) => this.submitElement(data, responseElement);
        }
        this.insertElementInChat(responseElement);
        subscription.unsubscribe();
      }
    });
  }

  public static startAuthentication(): void {
    // Displays the authentication text field
    let authTextField = getAuthTextField();
    authTextField.onSubmit = (data: any) => this.submitElement(data, authTextField);

    ChatService.insertElementInChat(authTextField);
  }

  public static insertElementInChat(element: any): number {
    // Displays the element in the chat
    const uid = this.generateUid();
    element.uid = uid;
    this.displayElementInChat?.(uid, element);
    return uid;
  }

  public static sendMessage(msg: string): void {
    // Handles input from the text field
    this.isGenerating = true;
    this.setSentMessage?.(this.generateUid(), msg);

    this.submitElement(
    {
      'contentType': 'message',
      'content': msg,
    }
  )
  }

  public static insertResponseMessage(msg: string): void {
    // Displays the response message in the chat
    const uid = this.generateUid();
    this.initilizeRecievedMessage?.(uid);
    this.displayRecievedMessage(uid, msg);

  }

  public static deleteChatContext(): void {
    // Delete context id
    this.aiRequestService.setContextId(null);
  }

  private static displayRecievedMessage(uid: number, msg: string): void {
    // Writes the message in a typewriter style
    let i = 0;
    let displayedText = '';
    this.setResponseGenerationState?.(false);
    const interval = setInterval(() => {
      if (i >= msg.length || this.shouldCancel) {
        clearInterval(interval);
        this.isGenerating = false;
      } else {
        displayedText += msg[i];
        this.setMessageText?.(uid, displayedText);
        i++;
      }
    }, 5);
  }

  private static generateUid(): number {
    // Generates a unique id
    return Math.floor(Math.random() * 100000000);
  }
}
