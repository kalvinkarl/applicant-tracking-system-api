import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  resend: boolean = false;
  resendingFailed: boolean = false;
  progress: boolean = false;
  hidePass: boolean = true;
  unverified: boolean = false;
  unverifiedEmail!: string;
  emailDomain!: string;
  customErrorStateMatcher = new CustomErrorStateMatcher;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.signinForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password:  new FormControl('',Validators.required),
    });
  }
  ngOnInit(): void {
    if(this.authService.getToken()){
			let user = this.authService.getUser();
			let role = user.role;
      if(role === 'su' || role === 'hr'){
        this.router.navigate(["admin"]);
      }else if(role === 'ap'){
        this.router.navigate(["user"]);
      }else if(role === 'ev'){
        this.router.navigate(["evaluate"]);
      }
    }
  }
  signin(): void {
    this.signinForm.controls['username'].markAsDirty();
    this.signinForm.controls['password'].markAsDirty();
    if(this.signinForm.valid){
      this.userService.signin(this.signinForm.value)
      .subscribe({
        next: res => {
          this.authService.saveToken(res.token);
          this.authService.saveUser(res);
          window.location.reload();
        },
        error: err => {
          if(err.status === 404){
            this.signinForm.controls['username'].setErrors({notFound:true});
          }
          if(err.status === 401){
            this.signinForm.controls['password'].setErrors({incorrect:true});
          }
          if(err.status === 403){
            this.unverifiedEmail = err.error.email;
            this.emailDomain = "https://" + this.unverifiedEmail.substring(this.unverifiedEmail.lastIndexOf("@") +1);
            this.unverified=true;
          }
        }
      });
    }
  }
  resendVerification():void {
    this.progress = true;
    if(this.unverified){
      this.userService.resendVerification({unverifiedEmail: this.unverifiedEmail})
      .subscribe({
        next: res => {
          this.emailDomain = "https://" + this.unverifiedEmail.substring(this.unverifiedEmail.lastIndexOf("@") +1);
          this.resend = true;
          this.progress = false;
        },
        error: err => {
          if(err.status === 406){
            this.resendingFailed = true;
            this.resend = true;
            this.progress = false;
          }
        }
      })
    }
  }
}
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
      control: FormControl | null,
  ): boolean {
      return !!(control && control.invalid && control.dirty);
  }
}