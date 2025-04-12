export class WsMessage {
}
////hard coded userId & recipientId for now
export class ChatMessage extends WsMessage {
    constructor(text) {
        super();
        this.text = text;
        this.domain = "chat";
        this.type = "messageSend";
        this.data = {
            text: this.text,
            userId: 42,
            recipientId: 666
        };
    }
}
/*
export class PongMessage extends WsMessage {
    type = "pong";
    constructor(public text: string) {
        super();
    }
}
*/
