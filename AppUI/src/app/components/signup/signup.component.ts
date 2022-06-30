import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit  {
  signupForm: FormGroup;
  saved = false;
  customErrorStateMatcher = new CustomErrorStateMatcher;
  constructor(private userService: UserService) {
    this.signupForm = new FormGroup({
      AccessionLevel: new FormControl('hr'),
      Username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9.]*$')]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password:  new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      PasswordConfirm:  new FormControl('', [Validators.required, Validators.minLength(7)])
    });
  }
  ngOnInit(): void { }

  signup(): void {
    this.signupForm.controls['Username'].markAsDirty();
    this.signupForm.controls['Email'].markAsDirty();
    this.signupForm.controls['Password'].markAsDirty();
    this.signupForm.controls['PasswordConfirm'].markAsDirty();
    if(this.signupForm.value.Password != this.signupForm.value.PasswordConfirm){
      this.signupForm.controls['PasswordConfirm'].setErrors({mustMatch: true});
    }else if(this.signupForm.valid){
      console.log(this.signupForm.value);
      this.userService.create(this.signupForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.saved = true;
        },
        error: (e) => {
          console.log('HTTP error:',e);
          if(e.status === 409){
            this.signupForm.controls['Username'].setErrors({ duplicate: true });
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