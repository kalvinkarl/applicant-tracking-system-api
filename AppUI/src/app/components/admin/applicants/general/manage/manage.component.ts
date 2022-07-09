import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Applicants } from 'src/app/models/admin/applicants';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  applicantForm!: FormGroup;
  applicant!: Applicants;
  constructor(private dialogRef: MatDialogRef<ManageComponent>) {
    this.applicantForm = new FormGroup({
      applicantId: new FormControl('1',Validators.required),

      salaryGrade: new FormControl('',Validators.required),
      placeOfAssignment: new FormControl('',Validators.required),
      statusOfAppointment: new FormControl('',Validators.required),

      latestIpcrRating: new FormControl('',Validators.required),
      dateOfLastPromotion: new FormControl('',Validators.required),
      eligibility: new FormControl('',Validators.required),
      educationalAttainment: new FormControl('',Validators.required),

      remarks: new FormControl('',Validators.required),
    })
  }

  ngOnInit(): void {
  }

  saveClick(){
    console.log("saved");
    this.dialogRef.close();
  }
}
