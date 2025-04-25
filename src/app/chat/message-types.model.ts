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
    placeholder: string;
    value?: string;
    highlight?: string;
}

interface TextFieldProps {
    uid: number;
    onSubmit: (actionId: number, value: string) => void;
    content: SingleTextFieldProps[]
    message?: string;
    status?: string;
}

export class TextField {
    contentType: string = 'textfield';
    uid: number;
    onSubmit: (actionId: number, value: string) => void;
    content: SingleTextFieldProps[]
    message : string;
    status: string;

    constructor({uid, onSubmit, content, message = '', status = 'normal'}: TextFieldProps) {
        this.uid = uid;
        this.onSubmit = onSubmit;
        this.content = content;
        this.message = message;
        this.status = status;
    }
}

// Option Buttons
export interface SingleOptionButtonProps {
    title: string;
    actionId: string;
    status?: string;
}

interface OptionButtonProps {
    message: string;
    onSubmit: (actionId: string) => void;
    buttons: SingleOptionButtonProps[];
    status?: string;
}

export class OptionButtons {
    contentType: string = 'optionbuttons';
    message: string;
    onSubmit: (actionId: string) => void;
    buttons: SingleOptionButtonProps[];
    status: string;

    constructor({message, onSubmit, buttons, status = 'normal'}: OptionButtonProps) {
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
    message: string;
    onSubmit: (actionId: string) => void;
    buttons: SingleBigButtonProps[];
    status?: string;
}

export class BigButtons {
    contentType: string = 'bigbuttons';
    message: string;
    onSubmit: (actionId: string) => void;
    buttons: SingleBigButtonProps[];
    status: string;

    constructor({message, onSubmit, buttons, status = 'normal'}: BigButtonProps) {
        this.message = message;
        this.onSubmit = onSubmit;
        this.buttons = buttons;
        this.status = status;
    }
}
