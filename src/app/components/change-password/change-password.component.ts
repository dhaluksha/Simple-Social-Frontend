import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.passwordForm = this.fb.group({
      cpassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.Validate.bind(this)
    });
  }

  ngOnInit(): void {}

  ChangePassword() {
    this.userService.ChangePassword(this.passwordForm.value).subscribe(data => {
      console.log(data);
      // this.passwordForm.reset();

    }, err => console.log(err)
    );
  }
  Validate(passwordFormgROUP: FormGroup) {
    const new_password = passwordFormgROUP.controls.newPassword.value;
    const confirm_password = passwordFormgROUP.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }
    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true,
      };
    }
    return null;
  }
}
