import { Component, Input } from '@angular/core';

import { BigButtons, SingleBigButtonProps } from '../message-types.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'chat-big-buttons',
  imports: [
    NgFor,
    NgIf
  ],
  templateUrl: './chat-big-buttons.component.html',
  styleUrl: './chat-big-buttons.component.css',
  standalone: true
})
export class ChatBigButtonsComponent {
  @Input() data! : BigButtons;
  renderedContent : SingleBigButtonProps[] = [];
  submitted : boolean = false;

  ngOnInit() {
    // Initialize the renderedContent with the buttons, setting undefined values to default values
    this.renderedContent = this.data.buttons;
    this.renderedContent.forEach((button : SingleBigButtonProps) => {
      if(!button.status) {
        button['status'] = 'available';
      } if(!button.icon) {
        button['icon'] = '';
      }
    });
  }

  bigButtonClicked(bigButton : SingleBigButtonProps) {
    // Calls the submit function and disables all buttons, hightlighting the selected one
    this.submitted = true;
    bigButton.status = 'selected';
    this.data.onSubmit(bigButton.actionId);
  }

  trackByFn(index: number): number {
    return index;
  }
}
