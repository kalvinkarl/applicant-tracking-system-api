import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	isLoggedIn = false;
  username!: string;
	showSuperUser!: boolean;
	showAdmin!: boolean;
	showApplicant!: boolean;
	showEvaluator!: boolean;
	constructor(private authService: AuthService){ }
	ngOnInit(): void {
		this.isLoggedIn = !!this.authService.getToken();
		if(this.isLoggedIn){
			let user = this.authService.getUser();
			let role = user.role;
			this.showSuperUser = role === 'su';
			this.showAdmin = role === 'hr';
			this.showApplicant = role === 'ap';
			this.showEvaluator = role === 'ev';
			this.username = user.username;
		}
	}
  logout(): void {
    this.authService.signOut();
    window.location.reload();
  }
}