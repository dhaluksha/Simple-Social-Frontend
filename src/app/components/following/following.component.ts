import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import {io} from 'socket.io-client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  following= [];
  user: any;;
  socket: any;

  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', ()=> {
      this.GetUser();
    })
  }
  GetUser(){
    this.userService.GetUserById(this.user._id).subscribe(data => {

      this.following = data.result.following;
    }, err => console.log(err)
    )
  }
  UnFollowUser(user){
    this.userService.UnFollowUser(user._id).subscribe(data => {
      this.socket.emit('refresh', {});

    })

  }

}
