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

  private isGenerating : boolean = false;
  private shouldCancel : boolean = false;

  constructor(private aiRequestService: AiRequestService) {};

  // Registers all needed Functions from the Chat Component, is called on init
  public registerCallbacks(
    {setSentMessageFunc, initilizeRecievedMessageFunc, cancelGenerationFunc, setMessageTextFunc} :
    {
      setSentMessageFunc : (uid : number, msg : string) => void,
      initilizeRecievedMessageFunc : (uid : number) => void,
      cancelGenerationFunc : (uid : number, onError : boolean) => void,
      setMessageTextFunc : (uid : number, msg : string) => void
    }) : void {
    this.setSentMessage = setSentMessageFunc;
    this.initilizeRecievedMessage = initilizeRecievedMessageFunc;
    this.cancelGeneration = cancelGenerationFunc;
    this.setMessageText = setMessageTextFunc;
  }

  private generateUid() : number {
    // Generates a uid which is used to identify each message and possibly modify them
    return Math.floor(Math.random() * 1000000);
  }

  public sendMessage(msg : string) {
    // Process the message sent by the user
    this.isGenerating = true;
    this.setSentMessage?.(this.generateUid(), msg);

    let uid = this.generateUid();
    this.initilizeRecievedMessage?.(uid);
    this.loadingAnimation(uid);

    this.generateResponse(uid, msg);
  }

  private async loadingAnimation(uid : number) {
    // Displays a . .. ... animation
    let numDots = 1;
    while(this.isGenerating) {
      numDots++;
      if(numDots > 3) {
        numDots = 1;
      }
      this.setMessageText?.(uid, '...'.substring(0, numDots));
      await new Promise(resolve => setTimeout(resolve, 300));  // Wait 300ms
    }
  }

  private displayResponse(uid : number, msg : string) {
    // Writes out the reponse in a typewriter animation
    let i = 0;
    let displayedText = '';
    const interval = setInterval(() => {
      if (i >= msg.length || this.shouldCancel == false) {
        clearInterval(interval);
        this.isGenerating = false;
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
          if(response == null) {
            this.cancelGeneration?.(uid, true);
            this.isGenerating = false;
            return;
          }
          this.displayResponse(uid, response['response'])
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
}
