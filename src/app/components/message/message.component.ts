import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import {io} from 'socket.io-client';
import _ from 'lodash';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() users;

  receiver: string;
  user: any;
  message: string;
  receiverData: any;
  messagesArry = [];
  socket: any;
  typingMessage;
  typing = false;
  isOnline = false;

  constructor(private messageService: MessageService, private tokenService: TokenService, private route: ActivatedRoute, private userService: UsersService) {
    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.route.params.subscribe(params => {
      // console.log(params);

      this.receiver = params.name;
      this.GetUserByUsername(this.receiver);

      this.socket.on('refreshPage', () => {
      this.GetUserByUsername(this.receiver);
      });
    });

    this.socket.on('is_typing', data => {
      if(data.sender === this.receiver){
        this.typing = true;
      }
    });
    this.socket.on('has_stopped_typing', data => {
      if(data.sender === this.receiver){
        this.typing = false;
      }
    });


  }
  ngAfterViewInit(){
    const params = {
      room1: this.user.username,
      room2: this.receiver
    };

    this.socket.emit('join chat', params)
  }
  ngOnChanges(changes: SimpleChanges){
   const title = document.querySelector('.nameCol');

   if(changes.users.currentValue.length > 0) {
    const result = _.indexOf(changes.users.currentValue, this.receiver);
    if(result> -1) {
      this.isOnline = true;
      // (title as HTMLElement).style.marginTop = '10px';
    }else {
      this.isOnline = false;
      (title as HTMLElement).style.marginTop = '20px';
    }
   }


  }

  GetUserByUsername(name){
    this.userService.GetUserByName(name).subscribe(data => {
      this.receiverData = data.result;

      this.GetMessages(this.user._id, data.result._id)

    })
  }
  SendMessage(){
    if(this.message) {
      this.messageService.SendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message).subscribe(data => {
        this.socket.emit('refresh', {})

        this.message = '';
      })
    }
  }

  GetMessages(senderId, receiverId){
    this.messageService.GetAllMessage(senderId, receiverId).subscribe(data => {
      this.messagesArry = data.messages.message;

    })
  }
  IsTyping(){
    this.socket.emit('start_typing', {
      sender: this.user.username,
      receiver: this.receiver
    })

    if(this.typingMessage){
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(()=> {
      this.socket.emit('stop_typing', {
      sender: this.user.username,
      receiver: this.receiver
      });
    }, 500)
  }

}
