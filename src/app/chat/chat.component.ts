import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages : any = [
    {'text': 'Hello, how can I help you?', 'type': 'recieved', 'uid': 0},
    {'text': 'Hello ...', 'type': 'sent', 'uid': 1},
  ];

  text : string = '';
  buttonDisabled : boolean = false;
  isLoading : boolean = false;
  submitViaEnter : boolean = false;

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

  generateResponse() : void {
    var uid = this.generateUid();
    this.messages.push({'text': '...', 'type': 'recieved', 'uid': uid});
    this.showLoading(uid)
  }

  cancelGeneration() : void {
    console.log('cancel')
    this.buttonDisabled = false;
    this.isLoading = false;
  }

  sendMessage() : void {
    console.log('enter');
    if(this.text != '') {
      this.messages.push({'text': this.text, 'type': 'sent', 'uid': this.generateUid()});
      this.generateResponse();
      this.buttonDisabled = true;
      this.text = '';
    } 
  }
}
