import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UserService, private route: Router){ }
  canActivate(){
    if(this.authService.getToken()){
      const user = this.authService.getUser();
      this.userService.findByUsername(user.username)
      .subscribe({
        next: res => {
          if(res.accessLevel === 'su' || res.accessLevel === 'hr'){
            this.route.navigate(["admin"]);
          }else if (res.accessLevel === 'ap'){
            this.route.navigate(["user"]);
          }else if (res.accessLevel === 'ev'){
            this.route.navigate(["evaluate"]);
          }
        },
        error: err => {
          this.authService.signOut();
          this.route.navigate([""]);
        }
      })
      return true;
    }else{
      this.route.navigate([""]);
      return false;
    }
  }
  
}
