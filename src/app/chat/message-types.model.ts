interface MessageProps {
    uid: number;
    type: string;
    content?: string;
    status?: string;
}
  
export class Message {
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
    onSubmit: (uid: number, content: string) => void;
    content?: string;
    status?: string;
}

export class TextField {
    uid: number;
    onSubmit: (uid: number, content: string) => void;
    content: string;
    status: string;

    constructor({uid, onSubmit, content = '', status = 'normal'}: TextFieldProps) {
        this.uid = uid;
        this.onSubmit = onSubmit;
        this.content = content;
        this.status = status;
    }
}