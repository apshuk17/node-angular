import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
    selector: 'app-message-list',
    template: `
            <div class="col-md-8 col-md-offset-2">
                <app-message 
                *ngFor = "let message of messages"
                [message]="message"></app-message>
            </div>
        `
})
export class MessageListComponent implements OnInit {

    constructor(private messageService: MessageService){}
    messages: Message[];
    
    ngOnInit(){
        //this.messages = this.messageService.getMessages();
        this.messageService.getDbMessages()
        .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
            },
            (err) => console.log(err)
        );
    }
}