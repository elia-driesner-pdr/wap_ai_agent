import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatService } from './chat.service';
import { AiRequestService } from '../ai-request.service';

import { Message, TextField, OptionButtons, BigButtons } from './message-types.model';
import { InfoCardsComponent } from '../info-cards/info-cards.component';
import { ChatTextFieldComponent } from './chat-text-field/chat-text-field.component';
import { ChatOptionButtonsComponent } from './chat-option-buttons/chat-option-buttons.component';
import { ChatBigButtonsComponent } from "./chat-big-buttons/chat-big-buttons.component";

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
        setWelcomeMessageFunc: this.setWelcomeMessage.bind(this)
    });
    ChatService.showWelcomeMessage();
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
    ChatService.insertResponseMessage('Um Ihnen besser helfen zu können authenfizieren Sie sich bitte mit ihrem Kennzeichen und ihrer Schadenummer');
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
        ],
        message: 'Um Ihnen besser helfen zu können authenfizieren Sie sich bitte mit ihrem Kennzeichen und ihrer Schadenummer',
      }
    ));

    this.messages.push(new OptionButtons(
    {
      message: 'Möchten sie einen Termin an einer dieser Zeiten buchen?',
      onSubmit: (actionId: string) => {console.log('OptionButton submitted:', actionId);},
      buttons: [
        { title: '01.10.2025 14:00', actionId: '14' },
        { title: '01.10.2025 13:00', actionId: '13' },
        { title: '01.10.2025 12:00', actionId: '12' }
      ],
    }
    ));

    this.messages.push(new BigButtons(
      {
        message: '',
        onSubmit: (actionId: string) => {console.log('OptionButton submitted:', actionId);},
        buttons: [
          { 
            title: 'Termin buchen', 
            description: 'Ich unterstützde dich gerne bei der Buchen eines Termins' , 
            actionId: 'buchen',
            icon: 'bi bi-calendar3'
          },
          { 
            title: 'Fragen beantworten', 
            description: 'Ich kann Fragen über PDR Team, unsere Prozesse und deinen Fall beantworten', 
            actionId: 'fragen',
            icon: 'bi bi-info-square-fill'
          },
        ],
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
