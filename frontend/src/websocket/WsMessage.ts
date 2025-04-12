export abstract class WsMessage {
    abstract domain: "chat";
    abstract type: string;
    data!: Record<string, any>;


}

////hard coded userId & recipientId for now

export class ChatMessage extends WsMessage {
    domain: "chat" = "chat";
    type = "messageSend";
    constructor(public text: string) {
        super();
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
