import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AiRequestService } from '../ai-request.service';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
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

  constructor(private aiRequestService: AiRequestService) {}

  generateUid() : number {
    return Math.floor(Math.random() * 1000000);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async showLoading(msgUid : number) {
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
    this.isLoading = false;

    let message = this.messages.find((message : any) => message.uid == msgUid);
    let i = 0;
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
    var uid = this.generateUid();
    this.messages.push({'text': '...', 'type': 'recieved', 'uid': uid});
    this.showLoading(uid)

    this.aiRequestService.sendChat(this.message).subscribe(
      (res: any) => {
        if(res['response'] != null) {
          this.displayMessage(res['response'], uid);
        } else {
          this.displayMessage(res, uid);
        }
      },
      (err : any) => console.error('Error:', err)
    );
  }

  cancelGeneration() : void {
    this.generatingResponse = false;
    this.isLoading = false;
  }

  sendMessage() : void {
    if(this.textFieldValue != '') {
      this.message = this.textFieldValue;
      this.textFieldValue = '';
      this.messages.push({'text': this.message, 'type': 'sent', 'uid': this.generateUid()});

      this.generatingResponse = true;
      this.generateResponse();
    } 
  }
}
