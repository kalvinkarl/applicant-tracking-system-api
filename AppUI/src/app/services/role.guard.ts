import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService:AuthService, private route: Router){ }
  canActivate(){
    if(this.authService.getToken()){
      const user = this.authService.getUser();
      if(user.role === 'su'){
        return true;
      }else{
        alert('Sorry, You are not authorize.');
        return false;
      }
    }else{
      this.route.navigate([""])
      return false;
    }
  }
  
}
