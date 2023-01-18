import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { io } from 'socket.io-client';
import _ from 'lodash';
import { PostService } from 'src/app/services/post.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.css']
})
export class TopStreamsComponent implements OnInit {

  topPosts = [];
  socket: any;
  user: any;

  constructor(private postService: PostService, private tokenService: TokenService,
  private router: Router) {
    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.AllPosts();

    this.socket.on('refreshPage', (data)=>{
      this.AllPosts();
    })

  }
  AllPosts(){
    this.postService.getAllPosts().subscribe(data => {
      // console.log(data);
      this.topPosts = data.top.reverse();

    }, err => {
      if(err.error.token === null) {
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    })
  }
  LikePost(post){
    // console.log(post);
    this.postService.addLike(post).subscribe(data => {
      // console.log(data);
      this.socket.emit('refresh', {})

    }, err => console.log(err) );

  }

  CheeckInLikeArray(arr, username){
    return _.some(arr, {username: username});
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }

  openCommentBox(post){
    this.router.navigate(['post', post._id])
  }
}
