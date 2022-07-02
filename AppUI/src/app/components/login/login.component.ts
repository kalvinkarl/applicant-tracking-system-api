import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  complete: boolean = false;
  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      Username: new FormControl(''),
      Password:  new FormControl(''),
    });
  }
  ngOnInit(): void { }
  signin(): void {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value)
    .subscribe({
      next: res => {
        localStorage.setItem("token",res.token);
        this.userService.isUserLoggedIn$.next(true);
        this.complete = true;
      },
      error: err => {
        console.log(err.error);
      }
    });
  }
}