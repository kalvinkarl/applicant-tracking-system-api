import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  complete: boolean = false;
  progress: boolean = false;
  hidePass: boolean = true;
  unverified:boolean = false;
  customErrorStateMatcher = new CustomErrorStateMatcher;
  constructor(private userService: UserService) {
    this.signinForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password:  new FormControl('',Validators.required),
    });
  }
  ngOnInit(): void { }
  signin(): void {
    this.signinForm.controls['username'].markAsDirty();
    this.signinForm.controls['password'].markAsDirty();
    if(this.signinForm.valid){
      this.userService.signin(this.signinForm.value)
      .subscribe({
        next: res => {
          console.log(res);
          // localStorage.setItem("token",res.token);
          // this.userService.isUserLoggedIn$.next(true);
          this.complete = true;
        },
        error: err => {
          if(err.status === 404){
            this.signinForm.controls['username'].setErrors({notFound:true});
          }
          if(err.status === 401){
            this.signinForm.controls['password'].setErrors({incorrect:true});
          }
          if(err.status === 403){
            this.unverified=true;
          }
        }
      });
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