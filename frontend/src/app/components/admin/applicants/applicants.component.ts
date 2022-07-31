import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageComponent } from './manage/manage.component';
import { Applicant } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
	selector: 'app-applicants',
	templateUrl: './applicants.component.html',
	styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit  {
	progress!: Boolean;
	displayedColumns: String[] = ['firstname', 'gender', 'age', 'contactNumber', 'actions'];
	dataSource!: MatTableDataSource<Applicant>;
	applicatsDataSource: Applicant[] = new Array;
	applicant!: Applicant;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	
	constructor (public dialog: MatDialog, private adminService: AdminService) { }
	ngOnInit(): void{
		this.adminService.getApplicantsData().then(res => {
			if(res){
				if(res.name === 'applicants'){
					this.dataSource = new MatTableDataSource(res.data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					this.applicatsDataSource = res.data;
				}else{
					this.loadApplicants();
				}
			}else{
				this.loadApplicants();
			}
		});
	}
	loadApplicants(): void{
		this.progress = true;
		this.adminService.findApplicants().subscribe({
			next: res => {
				this.adminService.saveApplicantsData('applicants',res);
				this.dataSource = new MatTableDataSource(res);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.progress = false;
				this.applicatsDataSource = res;
			},error: err => {
				console.log(err);
				this.progress = false;
			}
		});
	}
	onManage(applicant: Applicant){
	  const manageDialog = this.dialog.open(ManageComponent,{
		autoFocus: false,
		width: '95vw', //sets width of dialog
		// height:'95vh', //sets width of dialog
		maxWidth: '100vw', //overrides default width of dialog
		// maxHeight: '100vh', //overrides default height of dialog
		disableClose: true //disables closing on clicking outside box. You will need to make a dedicated button to close
	  });
	  manageDialog.componentInstance.applicant = applicant;
	  manageDialog.afterClosed().subscribe((res: Applicant) => {
		if(res){
			const index = this.applicatsDataSource.indexOf(res);
			if (index > -1) {
				this.applicatsDataSource[index].achievement = res.id;
				this.adminService.saveApplicantsData('applicants',this.applicatsDataSource);
				this.ngOnInit();
			}
		}
	  });
	}
	onEdit(applicant: Applicant){
		const editDialog = this.dialog.open(ManageComponent,{
			autoFocus: false,
			width: '95vw', //sets width of dialog
			// height:'95vh', //sets width of dialog
			maxWidth: '100vw', //overrides default width of dialog
			// maxHeight: '100vh', //overrides default height of dialog
			disableClose: true, //disables closing on clicking outside box. You will need to make a dedicated button to close
			data: {editApplicant: applicant, isEdit: true}
		});
		editDialog.componentInstance.applicant = applicant;
		// editDialog.afterClosed().subscribe((res: Applicant) => {
		//   if(res){
		// 	  const index = this.applicatsDataSource.indexOf(res);
		// 	  if (index > -1) {
		// 		  this.applicatsDataSource[index].achievement = res.id;
		// 		  this.adminService.saveApplicantsData(this.applicatsDataSource);
		// 		  this.ngOnInit();
		// 	  }
		//   }
		// });
	}
  
	onView(applicant: Applicant){
	  if(confirm('View the jobs of '+applicant.firstname)){
		console.log(applicant)
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