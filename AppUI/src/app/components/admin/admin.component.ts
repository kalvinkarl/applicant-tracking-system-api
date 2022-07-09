import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(result => result.matches),
		shareReplay()
	);
	username!: string;
	title!: string;
	constructor(private breakpointObserver: BreakpointObserver,private authService: AuthService, private router: Router) {
		this.router.events.subscribe( (event) => {
			if(event instanceof NavigationEnd){
				this.title = event.url.split('/')[ event.url.split('/').length - 1];
			}
		})
	}
	ngOnInit(): void {
		if(this.authService.getToken()){
			let user = this.authService.getUser();
			this.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
		}
	}
	logout(): void {
		this.authService.signOut();
		this.router.navigate([""]);
	}
}

