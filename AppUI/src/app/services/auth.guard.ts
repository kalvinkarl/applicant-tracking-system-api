import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private userService: UserService, private router: Router){ }
	canActivate(){
		if(this.authService.getToken()){
			const user = this.authService.getUser();
			this.userService.findByUsername(user.username)
			.subscribe({
				error: err => {
					this.authService.signOut();
					this.router.navigate([""]);
				}
			})
			return true;
		}else{
			this.router.navigate([""]);
			return false;
		}
	}
	
}
