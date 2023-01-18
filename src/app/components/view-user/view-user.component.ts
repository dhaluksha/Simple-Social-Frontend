import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, AfterViewInit {

  tabElement: any;
  postsTab = false;
  followingTab = false;
  followersTab = false;
  posts = [];
  following = [];
  followers = [];
  user: any;
  name: any;
  editForm: FormGroup;
  postValue: any;
  modalElement: any;
  socket: any;

  constructor(private route: ActivatedRoute, private userService: UsersService, private fb: FormBuilder, private postService: PostService
  ) {
    this.socket = io('http://localhost:5000');
    this.editForm = this.fb.group({
      editedPost: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postsTab = true;
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});

    this.tabElement = document.querySelector('.nav-content');

    this.modalElement = document.querySelector('.modal');
    M.Modal.init(this.modalElement, {});

    this.route.params.subscribe(params => {
      this.name = params.name;
      this.GetUserData(this.name);
    })
    this.socket.on('refreshPage', (data)=>{
      this.GetUserData(this.name);
    })
  }

  ngAfterViewInit(){
    this.tabElement.style.display = 'none'
  }
  ChangeTab(value) {
    if(value === 'posts') {
      this.postsTab = true;
      this.followingTab = false;
      this.followersTab = false;
    }
    if(value === 'following') {
      this.postsTab = false;
      this.followingTab = true;
      this.followersTab = false;
    }
    if(value === 'followers') {
      this.postsTab = false;
      this.followingTab = false;
      this.followersTab = true;
    }

  }
  GetUserData(name) {
    this.userService.GetUserByName(name).subscribe(data => {
      this.user = data.result;
      this.posts = data.result.posts.reverse();
      this.followers = data.result.followers;
      this.following = data.result.following;

    }, err => console.log(err)
    );
  }
   openEditModal(post){
    this.postValue = post;

  }
  SubmitEditedPost(){
    const body = {
      id: this.postValue.postId._id,
      post: this.editForm.value.editedPost
    }
    this.postService.EditPost(body).subscribe(res => {
      console.log(res);
      this.socket.emit('refresh', {});
    }, err => {
      console.log(err);
    });
    M.Modal.getInstance(this.modalElement).close();
    this.editForm.reset();
  }
  CloseModal(){
    M.Modal.getInstance(this.modalElement).close();
    this.editForm.reset();
  }
  DeletePost(){
    this.postService.DeletePost(this.postValue.postId._id).subscribe(res => {
      console.log(res);
      this.socket.emit('refresh', {});
    }, err => {
      console.log(err);
    });
    M.Modal.getInstance(this.modalElement).close();
  }


  TimeFromNow(time) {
    return moment(time).fromNow();
  }

}
