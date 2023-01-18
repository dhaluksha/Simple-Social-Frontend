import { AfterViewInit, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import {io} from 'socket.io-client';
import * as moment from 'moment';
import _ from 'lodash';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Output() onlineUsers = new EventEmitter();
  user: any;
  notifications = [];
  socket: any;
  count = [];
  chatList = [];
  msgNumber = 0;
  imageId: any;
  imageVersion: any;


  constructor(private tokenService: TokenService, private router: Router, private userService: UsersService, private messageService: MessageService) {
    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload()

    const dropdownElement = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    })
    const dropdownElementTwo = document.querySelectorAll('.dropdown-trigger1');
    M.Dropdown.init(dropdownElementTwo, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    })

    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });

    this.socket.emit('online', {room: 'global', user: this.user.username});

  }
  ngAfterViewInit(){
    this.socket.on('usersOnline', (data) => {
      this.onlineUsers.emit(data);

    });
  }

  GetUser(){
    this.userService.GetUserById(this.user._id).subscribe(data => {
      this.imageId = data.result.picId;
      this.imageVersion = data.result.picVersion;

      this.notifications = data.result.notifications.reverse();
      const value = _.filter(this.notifications, ['read', false]);
      this.count = value;

      this.chatList = data.result.chatList;
      this.checkIfRead(this.chatList);
      // console.log(this.msgNumber);

    },err => {
      if(err.error.token === null) {
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    })
  }
  checkIfRead(arr){
    const checkArr = [];
    for (let i = 0; i < arr.length; i++) {
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];
      if(this.router.url !== `/chat/${receiver.sendername}`){
        if(receiver.isRead === false && receiver.receivername === this.user.username){
          checkArr.push(1);
          this.msgNumber = _.sum(checkArr);
        }
      }
    }
  }
  MarkAll(){
    this.userService.MarkAllAsRead().subscribe(data => {
      // console.log(data);
      this.socket.emit('refresh', {});


    })
  }

  logout(){
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }
  GoToHome(){
    this.router.navigate(['streams']);
  }
  GotToChatPage(name){
    this.router.navigate(['chat', name]);
    this.messageService.MarkMessages(this.user.username, name).subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});

    })
  }
  TimeFromNow(time) {
    return moment(time).fromNow();
  }
  MessageDate(data){
    return moment(data).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY'
    })
  }

}
