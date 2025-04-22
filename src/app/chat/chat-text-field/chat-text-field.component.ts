import { Component, Input  } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TextField } from '../message-types.model';

@Component({
  selector: 'chat-text-field',
  imports: [
    FormsModule
  ],
  templateUrl: './chat-text-field.component.html',
  styleUrl: './chat-text-field.component.css'
})
export class ChatTextFieldComponent {
  @Input() data! : TextField;
  submitted : boolean = false;
  textFieldValue : string = '';

  buttonClicked() {
    if(this.textFieldValue.length > 0) {
      this.data.onSubmit(this.data.uid, this.textFieldValue);
      this.submitted = true;
    }
  }
}
