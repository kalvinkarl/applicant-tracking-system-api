import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageComponent } from './manage/manage.component';
import { ApplicantsService } from 'src/app/services/admin/applicants.service';
import { Applicants } from 'src/app/models/admin/applicants';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Gender', 'Age', 'Contact', 'actions'];
  dataSource!: MatTableDataSource<Applicants>;
  applicants!: any;
  applicant!: Applicants;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private applicantsService: ApplicantsService) {
    this.applicantsService.findGeneral().subscribe({
      next: res => {
        this.applicants = res;
        this.dataSource = new MatTableDataSource(this.applicants);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error: err => {

      }
    })
  }
  ngOnInit(): void { }

  onManage(applicant: Applicants){
    
    this.dialog.open(ManageComponent);
    // const dialogRef = this.dialog.open(ManageComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
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