import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import {io} from 'socket.io-client';
import * as moment from 'moment';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  commentForm: FormGroup;
  postId: any;
  commentsArray = [];
  socket: any;
  post: string;

  constructor(private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    })

    this.socket = io('http://localhost:5000')
  }

  ngOnInit(): void {
    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');

    this.GetPost();
    this.socket.on('refreshPage', data =>{
      this.GetPost();
    })
  }

  ngAfterViewInit(){
    this.toolbarElement.style.display= 'none';
  }

  AddComment(){
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.socket.emit('refresh', {});

      this.commentForm.reset();

    })
  }

  GetPost(){
    this.postService.getPost(this.postId).subscribe(data => {
      this.commentsArray = data.post.comments.reverse();
      this.post = data.post.post;

    })
  }
  TimeFromNow(time){
    return moment(time).fromNow();
  }
}
