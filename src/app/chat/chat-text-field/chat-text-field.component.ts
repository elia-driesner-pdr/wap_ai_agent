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

  renderedContent : { title: string, placeholder: string, value?: string, highlight?: string }[] = [];
  questionIndex : number = 0;
  numberOfQuestions : number = 0;

  ngOnInit() {
    // Initialize the renderedContent with the first question
    this.renderedContent.push(this.data.content[0]);
    this.renderedContent[0]['value'] = '';
    this.renderedContent[0]['highlight'] = '';
    if(this.data.content.length > 0) {
      this.numberOfQuestions = this.data.content.length;
    }
  }

  removeHighlights() {
    // Remove highlights from all questions
    this.renderedContent.forEach((question : { highlight?: string }) => {
      question['highlight'] = '';
    });
  }

  buttonClicked() {
    if(this.renderedContent[this.questionIndex]['value'] != '') {
      // If a value is entered, call the onSubmit function, remove highlights and proceed to the next question
      this.removeHighlights();
      this.questionIndex++;
      if(this.questionIndex < this.numberOfQuestions) {
        this.renderedContent.push(this.data.content[this.questionIndex]);
        this.renderedContent[this.questionIndex]['value'] = '';
        this.renderedContent[this.questionIndex]['highlight'] = '';
      } else {
        // ALl questions are answered
        this.submitted = true;
      }
    } else {
      // If no value is entered, highlight the current question
      this.renderedContent[this.questionIndex]['highlight'] = 'highlight-red';
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}
