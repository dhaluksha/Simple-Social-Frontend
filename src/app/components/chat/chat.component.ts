import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  tabElement: any;
  online_Users = [];

  constructor() { }

  ngOnInit(): void {
    this.tabElement = document.querySelector('.nav-content')
  }

  ngAfterViewInit(){
    this.tabElement.style.display = 'none';
  }
  online(event){
  this.online_Users = event;

  }

}
