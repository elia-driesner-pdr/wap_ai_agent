import { Message, TextField } from './message-types.model';

export function getAuthTextField(): TextField {
    var authTextField = new TextField(
        {
            uid: 0, 
            actionId: 'AID47306599',
            onSubmit: () => {}, 
            content: [
              {
                'title': 'Bitte geben sie ihr Kennzeichen ein',
                'placeholder': 'AA BB 123',
                'identifier': 'nummernschild'
              }
            ],
            message: 'Um auf deinen Fall zuzugreifen, authenfiziere dich bitte mit deinem Kennzeichen',
        }
    )
    return authTextField;
}

export function getAuthFailedMessage(): string {
    return 'Die Authentifizierung ist fehlgeschlagen. Dein Kennzeichen wurde nicht gefunden. Überprüfe bitte die Eingabe und versuche es erneut.';
}