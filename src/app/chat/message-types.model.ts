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


interface TextFieldProps {
    uid: number;
    onSubmit: (uid: number, value: string) => void;
    content: { [key: string]: string }[]
    status?: string;
}

export class TextField {
    contentType: string = 'textfield';
    uid: number;
    onSubmit: (uid: number, value: string) => void;
    content: { [key: string]: string }[]
    status: string;

    constructor({uid, onSubmit, content, status = 'normal'}: TextFieldProps) {
        this.uid = uid;
        this.onSubmit = onSubmit;
        this.content = content;
        this.status = status;
    }
}