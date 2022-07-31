import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router){}
	canActivate(){
		if(this.authService.getToken()){
			const user = this.authService.getUser();
			if(user.role === 'su' || user.role === 'hr'){
				return true;
			}else{
				this.router.navigate([""]);
				return false;
			}
		}else{
			this.router.navigate([""]);
			return false;
		}
	}
	
}
