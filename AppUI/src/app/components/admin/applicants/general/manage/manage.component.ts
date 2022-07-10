import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Applicant } from 'src/app/models/admin/applicant';
import { GeneralEvaluation } from 'src/app/models/admin/generalEvaluation';
import { Experience } from 'src/app/models/admin/experience';
import { Training } from 'src/app/models/admin/training';
import { MatChipInputEvent } from '@angular/material/chips';

export interface Eligibility{ name: string; }
export interface Education{ name: string; }

@Component({
	selector: 'app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
	step = 0;
	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	generalEvaluationForm!: FormGroup;
	experiencesForm!: FormGroup;
	trainingsForm!: FormGroup;
	applicant!: Applicant;
	eligibilities: Eligibility[] = [];
	educationalAttainments: Education[] = [];

	generalEvaluation!: GeneralEvaluation;
	experiences: Experience[] = [];
	trainings: Training[] = [];
	
	experiencesColumns: string[] = ['positionDesignation', 'from', 'to', 'remove'];
	trainingsColumns: string[] = ['providerOrganizer', 'from', 'to', 'remove'];

	@ViewChild(MatTable) experiencesTable!: MatTable<Experience>;
	@ViewChild(MatTable) trainingsTable!: MatTable<Training>;

	constructor(private dialogRef: MatDialogRef<ManageComponent>) {
		this.generalEvaluationForm = new FormGroup({
			salaryGrade: new FormControl('',Validators.required),
			placeOfAssignment: new FormControl('',Validators.required),
			statusOfAppointment: new FormControl('',Validators.required),
			dateOfLastPromotion: new FormControl('',Validators.required),
			latestIpcrRating: new FormControl('',Validators.required),
			eligibility: new FormControl('',Validators.required),
			educationalAttainment: new FormControl('',Validators.required),
			remarks: new FormControl('',Validators.required)
		});
		this.experiencesForm = new FormGroup({
			positionDesignation: new FormControl('',Validators.required),
			from: new FormControl('',Validators.required),
			to: new FormControl('',Validators.required)
		})
		this.trainingsForm = new FormGroup({
			title: new FormControl('',Validators.required),
			providerOrganizer: new FormControl('',Validators.required),
			from: new FormControl('',Validators.required),
			to: new FormControl('',Validators.required),
			hours: new FormControl('',Validators.required),
			typeOfLD: new FormControl('',Validators.required)
		})		
	}

	ngOnInit(): void { }

	onSave(){
		console.log("saved");
		this.dialogRef.close();
	}
	addEligibility(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add our fruit
		if (value) {
		  this.eligibilities.push({name: value});
		}

		// Clear the input value
		event.chipInput!.clear();
	}
	removeEligibility(eligibility: Eligibility): void {
		const index = this.eligibilities.indexOf(eligibility);
		if (index >= 0) {
			this.eligibilities.splice(index, 1);
		}
	}

	addEducation(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add our fruit
		if (value) {
		  this.educationalAttainments.push({name: value});
		}

		// Clear the input value
		event.chipInput!.clear();
	}
	removeEducation(education: Education): void {
		const index = this.educationalAttainments.indexOf(education);
		if (index >= 0) {
			this.educationalAttainments.splice(index, 1);
		}
	}
	
	appendExperience() {
		if(this.experiencesForm.valid){
			this.experiences.push({
				applicantId: this.applicant.id, 
				positionDesignation: this.experiencesForm.value.positionDesignation, 
				from: this.experiencesForm.value.from,
				to: this.experiencesForm.value.to
			});
			this.experiencesTable.renderRows();
		}
	}
	removeExperience(index: number){
		if(index >= 0){
			this.experiences.splice(index,1);
			this.experiencesTable.renderRows();
		}
	}
	
	appendTraining() {
		if(this.trainingsForm.valid){

			this.trainings.push({
				applicantId: this.applicant.id,
				title: this.trainingsForm.value.title,
				providerOrganizer: this.trainingsForm.value.providerOrganizer,
				from: this.trainingsForm.value.from,
				to: this.trainingsForm.value.to,
				hours: this.trainingsForm.value.hours,
				typeOfLD: this.trainingsForm.value.typeOfLD,
			});
			console.log(this.trainings);
			this.trainingsTable.renderRows();
		}
	}
	removeTraining(index: number){
		if(index >= 0){
			this.trainings.splice(index,1);
			this.trainingsTable.renderRows();
		}
	}

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}
}
