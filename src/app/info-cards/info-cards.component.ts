import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-info-cards',
  imports: [],
  templateUrl: './info-cards.component.html',
  styleUrl: './info-cards.component.css'
})
export class InfoCardsComponent {
  @Output() cardClicked = new EventEmitter<object>();

  infoCards = [
    {
      'title': 'Fragen beantworten', 
      'body': 'Allgemeine Fragen über PDR-Team und die Abläufe beantworten',
      'example': 'Erzähle mir etwas über PDR Team'
    },
    {
      'title': 'Daten abfragen', 
      'body': 'Welcher Station ist mein Kennzeichen [...] zugeordnet?',
      'example': 'Welcher Station bin ich zugeordnet, mein Kennzeichen ist [Kennzeichen]'
    },
    {
      'title': 'Termine buchen', 
      'body': 'Einfach Besichtigungstermine ausmachen',
      'example': 'Ich würde am [Datum] um [Uhrzeit] gerne ein Besichtigungstermin buchen, mein Kennzeichen ist [Kennzeichen]'
    },
  ];

  setExampleText(infoCard : object) {
    this.cardClicked.emit(infoCard)
  }
}
