import { Component, ElementRef, Input, QueryList, ViewChildren  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { TextField, SingleTextFieldProps } from '../message-types.model';

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
  @ViewChildren('inputRef') inputRefs!: QueryList<ElementRef>;
  submitted : boolean = false;

  renderedContent : SingleTextFieldProps[] = [];
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

  ngAfterViewInit() {
    // Focus the first question input field after the view has been initialized
    this.focusNewestQuestion();

  }


  focusNewestQuestion() {
    setTimeout(() => {
      const input = document.getElementById('input' + this.questionIndex.toString()) as HTMLInputElement;
      input?.focus();
    }, 50);
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
        this.focusNewestQuestion();
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
