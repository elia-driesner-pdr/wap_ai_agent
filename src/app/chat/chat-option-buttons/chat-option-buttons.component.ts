import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

import { OptionButtons } from '../message-types.model';

@Component({
  selector: 'chat-option-buttons',
  imports: [
    NgFor
  ],
  templateUrl: './chat-option-buttons.component.html',
  styleUrl: './chat-option-buttons.component.css',
  standalone: true
})
export class ChatOptionButtonsComponent {
  @Input() data! : OptionButtons;
  renderedContent : { title: string, actionId: string, status?: string }[] = [];
  submitted : boolean = false;

  ngOnInit() {
    this.renderedContent = this.data.buttons;
    this.renderedContent.forEach((button : { title: string, actionId: string, status?: string }) => {
      if(!button.status) {
        button['status'] = 'available';
      }
    });
  }

  optionButtonClicked(optionButton : { title: string, actionId: string, status?: string }) {
    // Calls the submit function and disables all buttons, hightlighting the selected one
    this.submitted = true;
    optionButton.status = 'selected';
    this.data.onSubmit(optionButton.actionId);
  }

  trackByFn(index: number): number {
    return index;
  }
}