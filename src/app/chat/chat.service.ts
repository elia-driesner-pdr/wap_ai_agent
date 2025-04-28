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
  private static responseGenerationFinished?: () => void;
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
    responseGenerationFinishedFunc,
    setWelcomeMessageFunc,
    displayElementInChatFunc
  }: {
    setSentMessageFunc: (uid: number, msg: string) => void;
    initilizeRecievedMessageFunc: (uid: number) => void;
    cancelGenerationFunc: (onError: boolean) => void;
    setMessageTextFunc: (uid: number, msg: string) => void;
    responseGenerationFinishedFunc: () => void;
    setWelcomeMessageFunc: (uid: number, msg: string) => void;
    displayElementInChatFunc: (uid: number, msg: any) => void;
  }): void {
    this.setSentMessage = setSentMessageFunc;
    this.initilizeRecievedMessage = initilizeRecievedMessageFunc;
    this.cancelGeneration = cancelGenerationFunc;
    this.setMessageText = setMessageTextFunc;
    this.responseGenerationFinished = responseGenerationFinishedFunc;
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

  public static submitElement(data: any) {
    let subscription: Subscription = this.aiRequestService.submitElement(data).subscribe({
      next: (response) => {
        if (!response || response['error']) {
          this.cancelGeneration?.(true);
          this.isGenerating = false;
          return;
        }
        if (response['contextId']) {
          this.aiRequestService.setContextId(response['contextId']);
        }

        switch(response['returnType']) {
          case 'message':
            this.insertResponseMessage(response['content']);
            break;
          case 'textfield':
            const textField : MessageModels.TextField = MessageModels.createTextField(
              response['element'],
              this.generateUid(),
              this.submitElement.bind(this)
            );
            this.insertElementInChat(textField);
            break;
        }
        subscription.unsubscribe();
      }
    });
  }

  public static startAuthentication(): void {
    ChatService.insertElementInChat(getAuthTextField((data) => this.submitElement(data)));
  }

  public static insertElementInChat(element: any): number {
    const uid = this.generateUid();
    element.uid = uid;
    this.displayElementInChat?.(uid, element);
    return uid;
  }

  public static sendMessage(msg: string): void {
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
    const uid = this.generateUid();
    this.initilizeRecievedMessage?.(uid);
    this.displayRecievedMessage(uid, msg);

  }

  public static deleteChatContext(): void {
    this.aiRequestService.setContextId(null);
  }

  private static displayRecievedMessage(uid: number, msg: string): void {
    let i = 0;
    let displayedText = '';
    this.responseGenerationFinished?.();
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
    return Math.floor(Math.random() * 100000000);
  }
}
