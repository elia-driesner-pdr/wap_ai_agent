import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatService } from './chat.service';
import { AiRequestService } from '../ai-request.service';

import './message-types.model';
import { InfoCardsComponent } from '../info-cards/info-cards.component';
import { ChatTextFieldComponent } from './chat-text-field/chat-text-field.component';
import { ChatOptionButtonsComponent } from './chat-option-buttons/chat-option-buttons.component';
import { ChatBigButtonsComponent } from "./chat-big-buttons/chat-big-buttons.component";
import { BigButtons, exampleBigButtons, exampleOptionButtons, exampleTextField, Message, OptionButtons, TextField } from './message-types.model';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    InfoCardsComponent,
    ChatTextFieldComponent,
    ChatOptionButtonsComponent,
    ChatBigButtonsComponent
],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  messages : any = [];

  textFieldValue : string = '';
  message : string = '';
  generatingResponse : boolean = false;

  constructor(private aiRequestService: AiRequestService) {}

  ngOnInit() {
    ChatService.init(this.aiRequestService);
    ChatService.registerCallbacks({
        setSentMessageFunc: this.displaySentMessage.bind(this),
        initilizeRecievedMessageFunc: this.initilizeRecievedMessage.bind(this),
        cancelGenerationFunc: this.cancelGeneration.bind(this),
        setMessageTextFunc: this.setMessageText.bind(this),
        responseGenerationFinishedFunc: this.responseGenerationFinished.bind(this),
        setWelcomeMessageFunc: this.setWelcomeMessage.bind(this),
        displayElementInChatFunc: this.displayElementInChat.bind(this),
    });
    ChatService.showWelcomeMessage();
    this.displayExampleElements();
  }

  displayExampleElements() {
    ChatService.insertElementInChat(exampleTextField);
    ChatService.insertElementInChat(exampleOptionButtons);
    ChatService.insertElementInChat(exampleBigButtons);
    this.messages.push(new Message({uid: 1234, type: 'sent', content: 'Hallo, das ist ein Beispieltext'}));
    this.messages.push(new Message({uid: 1235, type: 'recieved', content: 'Hallo, das ist ein Beispieltext'}));
  }

  responseGenerationFinished() {
    this.generatingResponse = false;
  }

  getChatContentByUid(uid : number ) {
    // Returns a message, found by uid
    return this.messages.find((message : any) => message.uid == uid);
  }

  displayElementInChat(uid : number, element : TextField | OptionButtons | BigButtons) : void {
    if(element.message != '') {
      ChatService.insertResponseMessage(element.message);
    }
    this.messages.push(element);
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
    // Displays the welcome message
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
    ChatService.cancelResponseGeneration();
  }

  sendMessage() : void {
    // Sends message the ChatService
    if(this.textFieldValue != '') {
      this.message = this.textFieldValue;
      this.textFieldValue = '';

      this.generatingResponse = true;
      ChatService.sendMessage(this.message);
    } 
  }

  setExampleText(cardInfo : any) {
    // Sets a predefined text in the textfield
    this.textFieldValue = cardInfo['example'];
  }

  deleteChatContext() {
    // Deletes the contextId
    ChatService.deleteChatContext();
    this.messages = [];
  }
}
