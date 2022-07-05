import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

	message!: string;
	constructor(private userService: UserService) { }

	ngOnInit(): void {
		this.userService.findByUsername("kissmemor08")
		.subscribe({
			next: res =>{
				this.message = `${res.Username},${res.Email},${res.AccessLevel},${res.Password}`;
			},
			error: err => {
				this.message = err.error.message
			}
		})
	}

}
