import { Component, Input } from '@angular/core';

import { BigButtons, SingleBigButtonProps } from '../message-types.model';

@Component({
  selector: 'chat-big-buttons',
  imports: [],
  templateUrl: './chat-big-buttons.component.html',
  styleUrl: './chat-big-buttons.component.css',
  standalone: true
})
export class ChatBigButtonsComponent {
  @Input() data! : BigButtons;
  renderedContent : SingleBigButtonProps[] = [];
  submitted : boolean = false;

  ngOnInit() {
    this.renderedContent = this.data.buttons;
    this.renderedContent.forEach((button : SingleBigButtonProps) => {
      if(!button.status) {
        button['status'] = 'available';
      }
    });
  }

  optionButtonClicked(optionButton : SingleBigButtonProps) {
    // Calls the submit function and disables all buttons, hightlighting the selected one
    this.submitted = true;
    optionButton.status = 'selected';
    this.data.onSubmit(optionButton.actionId);
  }

  trackByFn(index: number): number {
    return index;
  }
}
