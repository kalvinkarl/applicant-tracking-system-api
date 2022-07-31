import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageComponent } from './manage/manage.component';
import { Applicant } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
	progress!: Boolean;
  displayedColumns: string[] = ['firstname', 'gender', 'age', 'contactNumber', 'actions'];
  dataSource!: MatTableDataSource<Applicant>;
  applicants!: any;
  applicant!: Applicant;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private adminService: AdminService) {
  }
  ngOnInit(): void {
		this.adminService.getGeneralApplicantsData().then(res => {
			if(res){
        if(res.name === 'general-applicants'){
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }else{
          this.loadGeneralApplicants();
        }
			}else{
				this.loadGeneralApplicants();
			}
		});
  }
  loadGeneralApplicants(): void{
		this.progress = true;
    this.adminService.findGeneral().subscribe({
      next: res => {
				this.adminService.saveApplicantsData('general-applicants',res);
				this.dataSource = new MatTableDataSource(res);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				this.progress = false;
      },error: err => {
				console.log(err);
				this.progress = false;
      }
    });
  }
  onManage(applicant: Applicant){
    if(confirm('Manage:'+applicant.firstname)){
      console.log(applicant);
    }
    // const dialogRef = this.dialog.open(ManageComponent,{
    //   autoFocus: false,
    //   width: '95vw', //sets width of dialog
    //   // height:'95vh', //sets width of dialog
    //   maxWidth: '100vw', //overrides default width of dialog
    //   // maxHeight: '100vh', //overrides default height of dialog
    //   disableClose: true //disables closing on clicking outside box. You will need to make a dedicated button to close
    // });
    // dialogRef.componentInstance.applicant = applicant;
    // dialogRef.afterClosed().subscribe(res => {
    //   this.loadGeneralApplicants();
    // });
  }

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