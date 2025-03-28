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

  constructor(private chatService : ChatService) {}

  ngOnInit() {
    // Allows ChatService to call functions for editing messages ...
    this.chatService.registerCallbacks({
        setSentMessageFunc: this.displaySentMessage.bind(this),
        initilizeRecievedMessageFunc: this.initilizeRecievedMessage.bind(this),
        cancelGenerationFunc: this.cancelGeneration.bind(this),
        setMessageTextFunc: this.setMessageText.bind(this),
        responseGenerationFinishedFunc: this.responseGenerationFinished.bind(this)
    });
  }

  responseGenerationFinished() {
    this.generatingResponse = false;
  }

  getMsgByUid(uid : number ) {
    // Returns a message, found by uid
    return this.messages.find((message : any) => message.uid == uid);
  }

  displaySentMessage(uid : number, msg : string) : void {
    // Displays the message sent by the user
    this.messages.push({'text': msg, 'type': 'sent', 'uid': uid, 'status': 'normal'});
  }

  setMessageText(uid : number, msg : string) {
    // Edits the text of a message
    let message = this.getMsgByUid(uid);
    message.text = msg;
  }

  async initilizeRecievedMessage(uid : number) {
    // Creates the message object
    this.messages.push({'text': '...', 'type': 'recieved', 'uid': uid, 'status': 'normal'});
  }

  cancelGeneration(uid : number, onError = false) : void {
    // Stops the generation of the response
    let message = this.getMsgByUid(uid);

    this.generatingResponse = false;

    message.status = 'cancelled';
    if(onError) {
      message.text = 'Keine Verbindung zum Server';
    } else {
      message.text = 'Verarbeitung abgebrochen (Falls durch die Anfrage Änderungen vorgenommen wurden sind diese nicht zurückgesetzt)';
    }
  }

  cancel() {
    // Stops generation of response
    this.generatingResponse = false;
    this.chatService.cancelResponseGeneration();
  }

  sendMessage() : void {
    // Sends message the ChatService
    if(this.textFieldValue != '') {
      this.message = this.textFieldValue;
      this.textFieldValue = '';

      this.generatingResponse = true;
      this.chatService.sendMessage(this.message);
    } 
  }

  setExampleText(cardInfo : any) {
    // Sets a predefined text in the textfield
    this.textFieldValue = cardInfo['example'];
  }

  deleteChatContext() {
    // Deletes the contextId
    this.chatService.deleteChatContext();
  }
}
