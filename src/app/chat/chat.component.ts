import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatService } from './chat.service';
import { Message, TextField } from './message-types.model';
import { InfoCardsComponent } from '../info-cards/info-cards.component';

import { ChatTextFieldComponent } from './chat-text-field/chat-text-field.component';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    InfoCardsComponent,
    ChatTextFieldComponent
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
        responseGenerationFinishedFunc: this.responseGenerationFinished.bind(this),
        setWelcomeMessageFunc: this.setWelcomeMessage.bind(this)
    });
    this.chatService.showWelcomeMessage();
    this.displayTextField();
  }

  responseGenerationFinished() {
    this.generatingResponse = false;
  }

  getChatContentByUid(uid : number ) {
    // Returns a message, found by uid
    return this.messages.find((message : any) => message.uid == uid);
  }

  displayTextField() {
    this.messages.push(new TextField(
      {
        uid: 1234, 
        onSubmit: (uid: number, value: string) => {console.log('TextField submitted:', uid, value);}, 
        content: [
          {
            'title': 'Bitte geben sie ihr Kennzeichen ein',
            'placeholder': 'AA BB 123'
          }, {
            'title':'Bitte geben sie ihre Schadenummer ein',
            'placeholder': '123456789'
          }
        ]
      }
    ));
  }

  displaySentMessage(uid : number, msg : string) : void {
    // Displays the message sent by the user
    this.messages.push(new Message({uid: uid, type: 'sent', content: msg}));
  }

  setMessageText(uid : number, msg : string) {
    // Edits the text of a message
    let message = this.getChatContentByUid(uid);
    if (message) {
      message.content = msg;
    }
  }

  setWelcomeMessage(uid : number, msg : string) {
    this.messages.push(new Message({uid: uid, type: 'system', content: msg}));
  }

  async initilizeRecievedMessage(uid : number) {
    // Creates the message object
    this.messages.push(new Message({uid: uid, type: 'recieved', content: '...'}));
  }

  cancelGeneration(uid : number, onError = false) : void {
    // Stops the generation of the response
    let message = this.getChatContentByUid(uid);

    this.generatingResponse = false;

    if (!message) {
      return;
    }
    message.status = 'cancelled';
    if(onError) {
      message.content = 'Keine Verbindung zum Server';
    } else {
      message.content = 'Verarbeitung abgebrochen (Falls durch die Anfrage Änderungen vorgenommen wurden sind diese nicht zurückgesetzt)';
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
    this.messages = [];
  }
}
