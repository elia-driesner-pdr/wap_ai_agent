import { Component, Input  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { TextField } from '../message-types.model';

@Component({
  selector: 'chat-text-field',
  imports: [
    FormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './chat-text-field.component.html',
  styleUrl: './chat-text-field.component.css',
  standalone: true
})
export class ChatTextFieldComponent {
  @Input() data! : TextField;
  submitted : boolean = false;

  renderedContent : { [key: string]: string }[] = [];
  questionIndex : number = 0;
  numberOfQuestions : number = 0;

  ngOnInit() {
    this.renderedContent.push(this.data.content[0]);
    this.renderedContent[0]['value'] = '';
    if(this.data.content.length > 0) {
      this.numberOfQuestions = this.data.content.length;
    }
  }

  buttonClicked() {
    this.questionIndex++;
    if(this.questionIndex < this.numberOfQuestions) {
      this.renderedContent.push(this.data.content[this.questionIndex]);
      this.renderedContent[this.questionIndex]['value'] = '';
    } else {
      this.submitted = true;
    }
    console.log(this.renderedContent)
  }

  trackByFn(index: number): number {
    return index;
  }
}
