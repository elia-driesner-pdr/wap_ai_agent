import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { ChatService } from './chat.service';
import { AiRequestService } from '../ai-request.service';

import './message-types.model';
import { InfoCardsComponent } from '../info-cards/info-cards.component';
import { ChatTextFieldComponent } from './chat-text-field/chat-text-field.component';
import { ChatOptionButtonsComponent } from './chat-option-buttons/chat-option-buttons.component';
import { ChatBigButtonsComponent } from "./chat-big-buttons/chat-big-buttons.component";
import { BigButtons, exampleBigButtons, exampleOptionButtons, exampleTextField, Message, OptionButtons, TextField, ErrorMessage } from './message-types.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    InfoCardsComponent,
    ChatTextFieldComponent,
    ChatOptionButtonsComponent,
    ChatBigButtonsComponent,
    NgIf
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
        setResponseGenerationStateFunc: this.setResponseGenerationState.bind(this),
        setWelcomeMessageFunc: this.setWelcomeMessage.bind(this),
        displayElementInChatFunc: this.displayElementInChat.bind(this),
    });
    ChatService.showWelcomeMessage();
    ChatService.startAuthentication();
  }

  displayExampleElements() {
    ChatService.insertElementInChat(exampleTextField);
    ChatService.insertElementInChat(exampleOptionButtons);
    ChatService.insertElementInChat(exampleBigButtons);
    this.messages.push(new Message({uid: 124, type: 'sent', content: 'Hallo, das ist ein Beispieltext'}));
    this.messages.push(new Message({uid: 245, type: 'recieved', content: 'Hallo, das ist ein Beispieltext'}));
    this.scrollToElement(245);
  }

  setResponseGenerationState(state : boolean) {
    // Sets the state of the response generation
    this.generatingResponse = state;
  }

  getChatContentByUid(uid : number ) {
    // Returns a message, found by uid
    return this.messages.find((message : any) => message.uid == uid);
  }

  displayElementInChat(uid : number, element : TextField | OptionButtons | BigButtons | ErrorMessage) : void {
    // Adds element to the chat
    this.messages.push(element);
    this.scrollToElement(uid);
  }

  displaySentMessage(uid : number, msg : string) : void {
    // Displays the message sent by the user
    this.messages.push(new Message({uid: uid, type: 'sent', content: msg}));
    this.scrollToElement(uid);
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
    this.scrollToElement(uid);
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

  cancelGeneration(onError = false) : void {
    // Stops the generation of the response
    this.generatingResponse = false;

    ChatService.insertElementInChat(new ErrorMessage({
      uid: 0,
      content: onError ? 
      'Keine Verbindung zum Server' : 
      'Verarbeitung abgebrochen (Falls durch die Anfrage Änderungen vorgenommen wurden sind diese nicht zurückgesetzt)'
    }));
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

  cancel() {
    this.generatingResponse = false;
  }

  scrollToElement(uid : number) {
    // Scrolls to the bottom of the chat window
    if (typeof document !== 'undefined') { // Only run this code in the browser
      setTimeout(() => {
        const element = document.getElementById('message' + uid.toString()) as HTMLInputElement;
        element?.scrollIntoView({behavior: 'smooth'});
      }, 50);
    } 
  }
}
