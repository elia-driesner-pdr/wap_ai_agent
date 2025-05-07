import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatService } from '../chat.service';

@Component({
  selector: 'chat-input',
  imports: [
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  textFieldValue: string = '';
  generatingResponse: boolean = false;

  @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

  ngOnInit(): void {
    ChatService.registerInputCallbacks({
      inputSetGeneratingResponseFunc: this.setGeneratingResponse.bind(this),
    });
  }

  autoGrow(): void {
    const textarea = this.textareaRef.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  setGeneratingResponse(value: boolean): void {
    this.generatingResponse = value;
    console.log(value);
  }

  cancel(): void {
    this.generatingResponse = false;
  }

  sendMessage(): void {
    if (this.textFieldValue.trim()) {
      ChatService.sendMessage(this.textFieldValue);
      this.textFieldValue = '';
      this.generatingResponse = true;
      setTimeout(() => this.autoGrow(), 0);
    }
  }

  onEnter(event: KeyboardEvent) {
    // Only submit if Shift is *not* pressed
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();  // Prevent newline
      this.sendMessage();              // Submit form
    }
  }
}
