import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	serverConnectionError!:String;
	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(result => result.matches),
		shareReplay()
	);
	constructor(private breakpointObserver: BreakpointObserver,private authService: AuthService, private router: Router, private homeService: HomeService) { }
	ngOnInit(): void {
		if(this.authService.getToken()){
			let user = this.authService.getUser();
			if(user.role === 'su' || user.role === 'hr'){
				this.router.navigate(["admin"]);
			}else if(user.role === 'ap'){
				this.router.navigate(["user"]);
			}else if(user.role === 'ev'){
				this.router.navigate(["evaluate"]);
			}
    	}
		this.homeService.home().subscribe({
			next: res => {
				console.log(res.message);
			},
			error: err => {
				this.serverConnectionError = err.message;
				console.log(err);
			}
		})
	}
}
