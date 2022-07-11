import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Applicant } from 'src/app/models/admin/applicant';
import { GeneralEvaluation } from 'src/app/models/admin/generalEvaluation';
import { Experience } from 'src/app/models/admin/experience';
import { Training } from 'src/app/models/admin/training';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';

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
	eligibilities: Eligibility[] = new Array<Eligibility>;
	educationalAttainments: Education[] = new Array<Education>;

	generalEvaluation!: GeneralEvaluation;
	experiences: Experience[]= new Array<Experience>;
	trainings: Training[] = new Array<Training>;
	
	experiencesColumns: string[] = ['positionDesignation', 'from', 'to', 'remove'];
	trainingsColumns: string[] = ['title','providerOrganizer', 'from', 'to','hours','typeOfLD', 'remove'];

	@ViewChild('eligibilityChipList') eligibilityChipList!:MatChipList;
	@ViewChild('educationChipList') educationChipList!:MatChipList;
	@ViewChild('experiencesTable') experiencesTable!: MatTable<Experience>;
	@ViewChild('trainingsTable') trainingsTable!: MatTable<Training>;

	constructor(private dialogRef: MatDialogRef<ManageComponent>) {
		this.generalEvaluationForm = new FormGroup({
			salaryGrade: new FormControl(''),
			placeOfAssignment: new FormControl(''),
			statusOfAppointment: new FormControl(''),
			dateOfLastPromotion: new FormControl(''),
			latestIpcrRating: new FormControl(''),
			eligibility: new FormControl('',Validators.required),
			educationalAttainment: new FormControl('',Validators.required)
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
		console.log(this.generalEvaluationForm.value);
		console.log(this.eligibilities);
		console.log(this.educationalAttainments);
		console.log(this.experiences);
		console.log(this.trainings);
		this.dialogRef.close();
	}
	//Eligibiiligy button events
	addEligibility(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		if (value) {
		  this.eligibilities.push({name: value});
		}
		event.chipInput!.clear();
	}
	removeEligibility(eligibility: Eligibility): void {
		const index = this.eligibilities.indexOf(eligibility);
		if (index >= 0) {
			this.eligibilities.splice(index, 1);
		}
	}
	//Education button events
	addEducation(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		if (value) {
		  this.educationalAttainments.push({name: value});
		}
		event.chipInput!.clear();
	}
	removeEducation(education: Education): void {
		const index = this.educationalAttainments.indexOf(education);
		if (index >= 0) {
			this.educationalAttainments.splice(index, 1);
		}
	}
	//Experience button events
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
	//Training button events
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
			this.trainingsTable.renderRows();
		}
	}
	removeTraining(index: number){
		if(index >= 0){
			this.trainings.splice(index,1);
			this.trainingsTable.renderRows();
		}
	}
	//Expansion panel steps
	setStep(index: number) {
		this.step = index;
	}
	nextStep() {
		if(this.step === 0){
			this.eligibilityChipList.errorState = !this.eligibilities.length;
			this.educationChipList.errorState = !this.educationalAttainments.length;
			if(this.generalEvaluationForm.valid){
				this.step++;
			}
		}else if(this.step === 2){
			this.onSave();
		}
		else{
			this.step++;
		}
		
	}
	prevStep() {
		this.step--;
	}
}
