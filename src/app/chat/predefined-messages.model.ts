import { TextField } from './message-types.model';

export function getAuthTextField(onSubmitFunc : (textField: TextField) => void): TextField {
    var authTextField = new TextField(
        {
            uid: 0, 
            onSubmit: onSubmitFunc, 
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