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
      'example': 'Erzähle mir etwas über PDR Team',
      'icon': '<i class="bi bi-info-square-fill"></i>'
    },
    {
      'title': 'Daten abfragen', 
      'body': 'Welcher Station ist mein Kennzeichen [...] zugeordnet?',
      'example': 'Welcher Station bin ich zugeordnet, mein Kennzeichen ist [Kennzeichen]',
      'icon': '<i class="bi bi-bar-chart-fill"></i>'
    },
    {
      'title': 'Termine buchen', 
      'body': 'Einfach Besichtigungstermine ausmachen',
      'example': 'Ich würde am [Datum] um [Uhrzeit] gerne ein Besichtigungstermin buchen, mein Kennzeichen ist [Kennzeichen]',
      'icon': '<i class="bi bi-calendar3"></i>'
    },
  ];

  setExampleText(infoCard : object) {
    this.cardClicked.emit(infoCard)
  }
}
