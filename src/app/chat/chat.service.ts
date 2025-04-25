import { AiRequestService } from '../ai-request.service';

export class ChatService {
  private static aiRequestService: AiRequestService;

  private static setSentMessage?: (uid: number, msg: string) => void;
  private static initilizeRecievedMessage?: (uid: number) => void;
  private static cancelGeneration?: (uid: number, onError: boolean) => void;
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
    cancelGenerationFunc: (uid: number, onError: boolean) => void;
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
    this.displayResponse(uid, welcomeMsg);
  }

  public static insertElementInChat(msg: any): void {
    const uid = this.generateUid();
    this.displayElementInChat?.(uid, msg);
  }

  public static sendMessage(msg: string): void {
    this.isGenerating = true;
    this.setSentMessage?.(this.generateUid(), msg);

    const uid = this.generateUid();
    this.initilizeRecievedMessage?.(uid);
    this.loadingAnimation(uid);

    this.generateResponse(uid, msg);
  }

  public static insertResponseMessage(msg: string): void {
    const uid = this.generateUid();
    this.initilizeRecievedMessage?.(uid);
    this.displayResponse(uid, msg);

  }

  public static cancelResponseGeneration(): void {
    if (this.isGenerating && !this.shouldCancel) {
      this.shouldCancel = true;
    }
  }

  public static deleteChatContext(): void {
    this.aiRequestService.setContextId(null);
  }

  private static async loadingAnimation(uid: number): Promise<void> {
    let numDots = 1;
    while (this.isGenerating) {
      if (this.shouldCancel) {
        this.cancelGeneration?.(uid, false);
        return;
      }
      numDots = numDots > 3 ? 1 : numDots + 1;
      this.setMessageText?.(uid, '...'.substring(0, numDots));
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }

  private static displayResponse(uid: number, msg: string): void {
    let i = 0;
    let displayedText = '';
    const interval = setInterval(() => {
      if (i >= msg.length || this.shouldCancel) {
        clearInterval(interval);
        this.isGenerating = false;
        this.responseGenerationFinished?.();
      } else {
        displayedText += msg[i];
        this.setMessageText?.(uid, displayedText);
        i++;
      }
    }, 5);
  }

  private static generateResponse(uid: number, msg: string): void {
    this.aiRequestService.sendChat(msg).subscribe({
      next: (response) => {
        if (!this.shouldCancel) {
          if (!response || response['error']) {
            this.cancelGeneration?.(uid, true);
            this.isGenerating = false;
            return;
          }
          this.displayResponse(uid, response['response']);
          if (response['contextId']) {
            this.aiRequestService.setContextId(response['contextId']);
          }
        } else {
          this.shouldCancel = false;
          this.isGenerating = false;
        }
      }
    });
  }

  private static generateUid(): number {
    return Math.floor(Math.random() * 100000000);
  }
}
