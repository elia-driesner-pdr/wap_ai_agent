import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatService } from './chat.service';
import { AiRequestService } from '../ai-request.service';
import { InfoCardsComponent } from '../info-cards/info-cards.component';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    InfoCardsComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages : any = [];

  textFieldValue : string = '';
  message : string = '';
  generatingResponse : boolean = false;
  isLoading : boolean = false;
  submitViaEnter : boolean = false;
  generatingMessageUid : number = 0;

  constructor(private chatService : ChatService) {}

  ngOnInit() {
    this.chatService.registerCallbacks({
        setRecievedMessageFunc: this.displayRecievedMessage.bind(this),
        setSentMessageFunc: this.displaySentMessage.bind(this),
        initilizeRecievedMessageFunc: this.initilizeRecievedMessage.bind(this)
    });
  }

  getMsgByUid(uid : number ) {
    return this.messages.find((message : any) => message.uid == uid);
  }

  displayRecievedMessage(uid : number, msg : string) : void {
    let message = this.getMsgByUid(uid);
    message.text = '';
    
    // Write out message in a typewriter animation
    let i = 0;
    const interval = setInterval(() => {
      if (i >= msg.length || this.generatingResponse == false) {
        clearInterval(interval);
        this.generatingResponse = false;
      } else {
        message.text += msg[i];
        i++;
      }
    }, 5);
  }

  displaySentMessage(uid : number, msg : string) : void {
    this.messages.push({'text': msg, 'type': 'sent', 'uid': uid, 'status': 'normal'});
  }


  delay(ms: number) {
    // Delays by the specified number of ms
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  markAsCancelled(msgUid : number, newMsg : string) : void {
    let message = this.messages.find((message : any) => message.uid == msgUid);
    message.text = newMsg;
    message.status = 'cancelled';
  }

  isGenerationCancelled(message : any) : boolean {
    if(this.generatingResponse == false) {
      this.markAsCancelled(message, 'Verarbeitung abgebrochen');
      return true;
    }
    return false;
  }

  async initilizeRecievedMessage(uid : number) {
    // Creates the message object and displays a loading animation
    this.messages.push({'text': '...', 'type': 'sent', 'uid': uid, 'status': 'normal'});
    let message = this.getMsgByUid(uid);

    let numDots = 1;
    this.isLoading = true;
    while(this.isLoading) {
      if(message) {
        numDots++;
        if(numDots > 3) {
          numDots = 1;
        }
        message.text = '...'.substring(0, numDots);
      }
      await this.delay(300);
    }
  }

  cancelGeneration(onError = false) : void {
    // Stops the generation of the response
    this.generatingResponse = false;
    this.isLoading = false;
    if(this.generatingMessageUid != 0) {
      if(onError) {
        this.markAsCancelled(this.generatingMessageUid, 'Keine Verbindung zum Server');
      } else {
        this.markAsCancelled(this.generatingMessageUid, 'Verarbeitung abgebrochen');
      }
      this.generatingMessageUid = 0;
    }
  }

  sendMessage() : void {
    if(this.textFieldValue != '') {
      this.message = this.textFieldValue;
      this.textFieldValue = '';

      this.generatingResponse = true;
      this.chatService.sendMessage(this.message);
    } 
  }

  setExampleText(cardInfo : any) {
    this.textFieldValue = cardInfo['example'];
  }
}
