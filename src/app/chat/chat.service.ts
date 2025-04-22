import { Injectable } from '@angular/core';

import { AiRequestService } from '../ai-request.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private setSentMessage?: (uid : number, msg : string) => void;
  private initilizeRecievedMessage?: (uid : number) => void;
  private cancelGeneration?: (uid : number, onError : boolean) => void;
  private setMessageText?: (uid : number, msg : string) => void;
  private responseGenerationFinished?: () => void;
  private setWelcomeMessage?: (uid : number, msg : string) => void;

  private isGenerating : boolean = false;
  private shouldCancel : boolean = false;

  constructor(private aiRequestService: AiRequestService) {};

  // Registers all needed Functions from the Chat Component, is called on init
  public registerCallbacks(
    {
      setSentMessageFunc, initilizeRecievedMessageFunc, cancelGenerationFunc, 
      setMessageTextFunc, responseGenerationFinishedFunc, setWelcomeMessageFunc} :
    {
      setSentMessageFunc : (uid : number, msg : string) => void,
      initilizeRecievedMessageFunc : (uid : number) => void,
      cancelGenerationFunc : (uid : number, onError : boolean) => void,
      setMessageTextFunc : (uid : number, msg : string) => void,
      responseGenerationFinishedFunc : () => void,
      setWelcomeMessageFunc : (uid : number, msg : string) => void
    }) : void {
    this.setSentMessage = setSentMessageFunc;
    this.initilizeRecievedMessage = initilizeRecievedMessageFunc;
    this.cancelGeneration = cancelGenerationFunc;
    this.setMessageText = setMessageTextFunc;
    this.responseGenerationFinished = responseGenerationFinishedFunc;
    this.setWelcomeMessage = setWelcomeMessageFunc;
  }

  private generateUid() : number {
    // Generates a uid which is used to identify each message and possibly modify them
    return Math.floor(Math.random() * 100000000);
  }

  public showWelcomeMessage() {
    let uid : number = this.generateUid();
    let welcomeMsg : string = 'Hallo, ich bin ein Chatbot von PDR Team. Ich kann dir gerne Auskunft über uns oder deinen Fall geben.';
    this.setWelcomeMessage?.(uid, '');
    this.displayResponse(uid, welcomeMsg);
  }

  public sendMessage(msg : string) {
    // Process the message sent by the user
    this.isGenerating = true;
    this.setSentMessage?.(this.generateUid(), msg);

    let uid : number = this.generateUid();
    this.initilizeRecievedMessage?.(uid);
    this.loadingAnimation(uid);

    this.generateResponse(uid, msg);
  }

  private async loadingAnimation(uid : number) {
    // Displays a . .. ... animation
    let numDots = 1;
    while(this.isGenerating) {
      if(this.shouldCancel == true) {
        this.cancelGeneration?.(uid, false);
        return;
      }
      numDots++;
      if(numDots > 3) {
        numDots = 1;
      }
      this.setMessageText?.(uid, '...'.substring(0, numDots));
      await new Promise(resolve => setTimeout(resolve, 300));  // Wait 300ms
    }
  }

  private displayResponse(uid : number, msg : string) : void {
    // Writes out the reponse in a typewriter animation
    let i = 0;
    let displayedText = '';
    const interval = setInterval(() => {
      if (i >= msg.length || this.shouldCancel == true) {
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

  private generateResponse(uid : number, msg : string) : void {
    // Requests the server for a response and displays it
    this.aiRequestService.sendChat(msg).subscribe({
      next: (response) => {
        if(this.shouldCancel == false) {
          if(response == null || response['error']) {
            this.cancelGeneration?.(uid, true);
            this.isGenerating = false;
            return;
          }
          this.displayResponse(uid, response['response'])
          if(response['contextId']) {
            this.aiRequestService.setContextId(response['contextId']);
          }

        } else {
          this.shouldCancel = false;
          this.isGenerating = false;
        }
      },
    });
  }

  public cancelResponseGeneration() {
    // Stops the generation of the response
    if(this.isGenerating == true && this.shouldCancel == false) {
      this.shouldCancel = true;
    }
  }

  public deleteChatContext() {
    // Deletes the context Id
    this.aiRequestService.setContextId(null);
  }
}
