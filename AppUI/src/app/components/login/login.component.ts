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
  saved = false;
  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      Username: new FormControl(''),
      Password:  new FormControl(''),
    });
  }
  ngOnInit(): void { }
  signin(): void {
    this.userService.findByUsername('kalvin').subscribe({
      next: data => {
        console.log(data);
        this.saved = true;
      },
      error: e => console.log(e)
    })
  }
}
