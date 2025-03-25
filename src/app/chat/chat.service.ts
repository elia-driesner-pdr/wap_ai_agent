import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AiRequestService } from '../ai-request.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private setRecievedMessage?: (uid : number, msg : string) => void;
  private setSentMessage?: (uid : number, msg : string) => void;
  private initilizeRecievedMessage?: (uid : number) => void;

  constructor(private aiRequestService: AiRequestService) {};

  // Registers all needed Functions from the Chat Component, is called on init
  public registerCallbacks(
    {setRecievedMessageFunc, setSentMessageFunc, initilizeRecievedMessageFunc} :
    {
      setRecievedMessageFunc : (uid : number, msg : string) => void,
      setSentMessageFunc : (uid : number, msg : string) => void,
      initilizeRecievedMessageFunc : (uid : number) => void
    }) : void {
    this.setRecievedMessage = setRecievedMessageFunc;
    this.setSentMessage = setSentMessageFunc;
    this.initilizeRecievedMessage = initilizeRecievedMessageFunc;
  }

  private generateUid() : number {
    // Generates a uid which is used to identify each message and possibly modify them
    return Math.floor(Math.random() * 1000000);
  }

  public sendMessage(msg : string) {
    this.setSentMessage?.(this.generateUid(), msg);

    /*
    let uid = this.generateUid();
    this.initilizeRecievedMessage?.(uid);
    
    this.generateResponse(uid, msg);
    */
  }

  generateResponse(uid : number, msg : string) : void {
    this.aiRequestService.sendChat(msg).subscribe({
      next: (response) => {
        if(response == null) {
          // TODO cancel generation
        }
        this.setRecievedMessage?.(uid, response['response'])
      },
    });
  }
}
