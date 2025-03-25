import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
export class ChatComponent {
  messages : any = [];

  textFieldValue : string = '';
  message : string = '';
  generatingResponse : boolean = false;
  isLoading : boolean = false;
  submitViaEnter : boolean = false;
  generatingMessageUid : number = 0;

  constructor(private aiRequestService: AiRequestService) {}

  generateUid() : number {
    // Generates a uid which is used to identify each message and possibly modify them
    return Math.floor(Math.random() * 1000000);
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

  async showLoading(msgUid : number) {
    // Displays animated dots indicating that the request is processing
    let message = this.messages.find((message : any) => message.uid == msgUid);
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

  displayMessage(msg : string , msgUid : number) : void {
    // Writes out the message character by character, with a 5ms delay inbetween
    this.isLoading = false;

    let message = this.messages.find((message : any) => message.uid == msgUid);
    let i = 0;

    if(this.isGenerationCancelled(message)) return;

    message.text = '';
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

  generateResponse() : void {
    // Calls the loading animation and sends the API request
    var uid = this.generateUid();
    this.generatingMessageUid = uid;
    this.messages.push({'text': '...', 'type': 'recieved', 'uid': uid, 'status': 'normal'});
    this.showLoading(uid)

    this.aiRequestService.sendChat(this.message).subscribe({
      next: (response) => {
        if(response == null) {
          this.cancelGeneration(true);
          return;
        }
        if(response['response'] != null) {
          this.displayMessage(response['response'], uid);
        } else {
          this.displayMessage(response, uid);
        }
      },
    });
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
      this.messages.push({'text': this.message, 'type': 'sent', 'uid': this.generateUid(), 'status': 'normal'});

      this.generatingResponse = true;
      this.generateResponse();
    } 
  }

  setExampleText(cardInfo : any) {
    this.textFieldValue = cardInfo['example'];
  }
}
