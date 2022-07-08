import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Applicants } from 'src/app/models/admin/applicants';
import { ApplicantsService } from 'src/app/services/admin/applicants.service';

@Component({
	selector: 'app-applicants',
	templateUrl: './applicants.component.html',
	styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit  {
	displayedColumns: string[] = ['Name', 'Gender', 'Age', 'Contact', 'actions'];
	dataSource!: MatTableDataSource<Applicants>;
	applicants!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

	constructor(private applicantsService: ApplicantsService) {
		this.applicantsService.findAll().subscribe({
			next:(res)=>{
				this.applicants = res;
				this.dataSource = new MatTableDataSource(this.applicants);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				console.log(res);
			},
			error:(err)=>{
				console.log(err);
			}
		})
	}
	ngOnInit(): void { }

	onEdit(user: any){
		// this.populateForm(user);
		console.log(user)
	}
	onDelete(user: any){
		if(confirm('Are you sure to delete?')){
			console.log(user)
		}
	}
	applyFilter(event: Event) {
	  const filterValue = (event.target as HTMLInputElement).value;
	  this.dataSource.filter = filterValue.trim().toLowerCase();

	  if (this.dataSource.paginator) {
	    this.dataSource.paginator.firstPage();
	  }
	}
}