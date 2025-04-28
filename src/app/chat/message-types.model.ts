// Message
interface MessageProps {
    uid: number;
    type: string;
    content?: string;
    status?: string;
}
  
export class Message {
    contentType: string = 'message';
    uid: number;
    type: string;
    content: string;
    status: string;

    constructor({ uid, type, content = '', status = 'normal' }: MessageProps) {
        this.uid = uid;
        this.type = type;
        this.content = content;
        this.status = status;
    }
}

// Text Field
export interface SingleTextFieldProps {
    title: string;
    identifier: string
    placeholder: string;
    value?: string;
    highlight?: string;
}

interface TextFieldProps {
    uid: number;
    actionId: string;
    onSubmit: (...args: any[]) => void;
    content: SingleTextFieldProps[]
    message?: string;
    status?: string;
}

export class TextField {
    contentType: string = 'textfield';
    uid: number;
    actionId: string;
    onSubmit: (...args: any[]) => void;
    content: SingleTextFieldProps[]
    message : string;
    status: string;

    constructor({uid, actionId, onSubmit, content, message = '', status = 'normal'}: TextFieldProps) {
        this.uid = uid;
        this.actionId = actionId;
        this.onSubmit = onSubmit;
        this.content = content;
        this.message = message;
        this.status = status;
    }
}

export function createTextField(element: any, uid: number, onSubmit: (...args: any[]) => void): TextField {
    const content: SingleTextFieldProps[] = element.content.map((item: any) => ({
        title: item.title,
        identifier: item.identifier,
        placeholder: item.placeholder,
    }));

    return new TextField({
        uid,
        actionId: element.actionId,
        onSubmit,
        content,
        message: element.message ?? '',
        status: 'normal'
    });
}


// Option Buttons
export interface SingleOptionButtonProps {
    title: string;
    actionId: string;
    status?: string;
}

interface OptionButtonProps {
    uid: number;
    message: string;
    onSubmit: (actionId: string) => void;
    buttons: SingleOptionButtonProps[];
    status?: string;
}

export class OptionButtons {
    uid: number;
    contentType: string = 'optionbuttons';
    message: string;
    onSubmit: (actionId: string) => void;
    buttons: SingleOptionButtonProps[];
    status: string;

    constructor({uid, message, onSubmit, buttons, status = 'normal'}: OptionButtonProps) {
        this.uid = uid;
        this.message = message;
        this.onSubmit = onSubmit;
        this.buttons = buttons;
        this.status = status;
    }
}

// Big Buttons
export interface SingleBigButtonProps {
    title: string;
    description: string;
    actionId: string;
    icon?: string;
    status?: string;
}

interface BigButtonProps {
    uid: number;
    message: string;
    onSubmit: (actionId: string) => void;
    buttons: SingleBigButtonProps[];
    status?: string;
}

export class BigButtons {
    uid: number;
    contentType: string = 'bigbuttons';
    message: string;
    onSubmit: (actionId: string) => void;
    buttons: SingleBigButtonProps[];
    status: string;

    constructor({uid, message, onSubmit, buttons, status = 'normal'}: BigButtonProps) {
        this.uid = uid;
        this.message = message;
        this.onSubmit = onSubmit;
        this.buttons = buttons;
        this.status = status;
    }
}

export var exampleTextField = new TextField(
    {
      uid: 12407, 
      actionId: 'AID47306591239',
      onSubmit: (uid: number, value: string) => {console.log('TextField submitted:', uid, value);}, 
      content: [
        {
          'title': 'Bitte geben sie ihr Kennzeichen ein',
          'placeholder': 'AA BB 123',
          'identifier': 'nummernschild'
        }, {
          'title':'Bitte geben sie ihre Schadenummer ein',
          'placeholder': '123456789',
          'identifier': 'schadenummer'
        }
      ],
      message: 'Um Ihnen besser helfen zu können authenfizieren Sie sich bitte mit ihrem Kennzeichen und ihrer Schadenummer',
    }
);

export var exampleOptionButtons = new OptionButtons(
    {
        uid: 230758,
        message: 'Möchten sie einen Termin an einer dieser Zeiten buchen?',
        onSubmit: (actionId: string) => {console.log('OptionButton submitted:', actionId);},
        buttons: [
            { title: '01.10.2025 14:00', actionId: '14' },
            { title: '01.10.2025 13:00', actionId: '13' },
            { title: '01.10.2025 12:00', actionId: '12' }
        ],
    }
);

export var exampleBigButtons = new BigButtons(
    {
        uid: 1398560,
        message: '',
        onSubmit: (actionId: string) => {console.log('OptionButton submitted:', actionId);},
        buttons: [
            { 
            title: 'Termin buchen', 
            description: 'Ich unterstützde dich gerne bei der Buchen eines Termins' , 
            actionId: 'buchen',
            icon: 'bi bi-calendar3'
            },
            { 
            title: 'Fragen beantworten', 
            description: 'Ich kann Fragen über PDR Team, unsere Prozesse und deinen Fall beantworten', 
            actionId: 'fragen',
            icon: 'bi bi-info-square-fill'
            },
        ],
    }
);