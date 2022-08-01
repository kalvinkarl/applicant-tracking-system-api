import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit  {
  signupForm: FormGroup;
  confirming!: Boolean;
  manyRequest!: Boolean;
  progress = false;
  hidePa = true;
  hideRe = true;
  emailDomain!: string;
  customErrorStateMatcher = new CustomErrorStateMatcher;
  constructor(private userService: UserService,private authService: AuthService,private router: Router) {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9.]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password:  new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      passwordConfirm:  new FormControl('', [Validators.required, Validators.minLength(7)])
    });
  }
  ngOnInit(): void {
    if(this.authService.getToken()){
			let user = this.authService.getUser();
			let role = user.role;
      if(role === 'su' || role === 'hr'){
        this.router.navigate(["admin"]);
      }else if(role === 'ap'){
        this.router.navigate(["applicant"]);
      }else if(role === 'ev'){
        this.router.navigate(["evaluator"]);
      }
    }
  }
  signup(): void {
    this.signupForm.controls['username'].markAsDirty();
    this.signupForm.controls['email'].markAsDirty();
    this.signupForm.controls['password'].markAsDirty();
    this.signupForm.controls['passwordConfirm'].markAsDirty();
    if(this.signupForm.value.password != this.signupForm.value.passwordConfirm){
      this.signupForm.controls['passwordConfirm'].setErrors({mustMatch: true});
    }
    if(this.signupForm.valid){
      this.progress = true;
      this.userService.signup(this.signupForm.value).subscribe({
        error: (err) => {
          if(err.status === 429){
            this.manyRequest = true;
            this.progress = false;
          }
          if(err.error.title === "Username"){
            this.signupForm.controls['username'].setErrors({duplicate: true});
            this.progress = false;
          }else if (err.error.title === "Email"){
            this.signupForm.controls['email'].setErrors({duplicate: true});
            this.progress = false;
          }else if(err.error.title === "Exist"){
            this.signupForm.controls['email'].setErrors({duplicate: true});
            this.signupForm.controls['username'].setErrors({ duplicate: true , duplicateBoth: true});
            this.progress = false;
          }
        },
        next: (res) => {
          this.emailDomain = "https://" + this.signupForm.value.email.substring(this.signupForm.value.email.lastIndexOf("@") +1);
          this.confirming = true;
          this.progress = false;
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