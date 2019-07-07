import { Injectable } from '@angular/core';
import { MessageData } from '../../dto/message.data';

@Injectable()
export class MessageWebDTO {
    id: number;
    messageData: MessageData [];
    constructor(){
        this.messageData = [];
        this.id = 0;
    }
}