import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMsg: string;
  showSpinner = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }


  signupUser() {
    this.showSpinner = true
    // console.log(this.signupForm.value);
    // let userData=new AuthData()
    // userData.username= this.signupForm.get('username').value,
    // userData.email= this.signupForm.get('email').value,
    // userData.password= this.signupForm.get('password').value,

    this.authService.registerUser(this.signupForm.value).subscribe(data => {
      this.tokenService.SetToken(data.token);
      setTimeout(() => {
        this.router.navigate(['streams']);
      }, 2000)

    }, err => {
      this.showSpinner = false;
      if (err.error.msg) {
        this.errorMsg = err.error.msg[0].message
      }
      if (err.error.message) {
        this.errorMsg = err.error.message
      }
    }
    )
    this.signupForm.reset()
  }

}
