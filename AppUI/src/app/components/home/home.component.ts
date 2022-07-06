import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(result => result.matches),
		shareReplay()
	);
	constructor(private breakpointObserver: BreakpointObserver,private authService: AuthService, private router: Router) { }
	ngOnInit(): void {
		
		if(this.authService.getToken()){
			let user = this.authService.getUser();
			let role = user.role;
			if(role === 'su' || role === 'hr'){
				this.router.navigate(["admin"]);
			}else if(role === 'ap'){
				this.router.navigate(["applicant"]);
			}else if(role === 'ev'){
				this.router.navigate(["evaluator"]);
			}
    	}
	}
}
