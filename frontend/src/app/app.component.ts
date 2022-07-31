import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = "DENR-HR Applicant Management Web Application"
	constructor(){ }
	ngOnInit(): void { }
}