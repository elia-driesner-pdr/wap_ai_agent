import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

  autoGrow(): void {
    const textarea = this.textareaRef.nativeElement;
    console.log(textarea);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  sendMessage(): void {
    if (this.textFieldValue.trim()) {
      console.log('Sending message:', this.textFieldValue);
      // Add logic to send the message
      this.textFieldValue = '';
      this.autoGrow(); // Reset height
    }
  }
}
