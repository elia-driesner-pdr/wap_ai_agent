import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { InputFieldComponent } from './input-field/input-field.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    InputFieldComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wap_ai_agent';
}
