import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Applicant, Achievement, Experience, Training} from 'src/app/models/admin';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { AdminService } from 'src/app/services/admin.service';

@Component({
	selector: 'app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
	progress!: Boolean;
	step = 0;
	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	achievementForm!: FormGroup;
	experiencesForm!: FormGroup;
	trainingsForm!: FormGroup;
	applicant!: Applicant;
	eligibilities: string[] = new Array;
	educationalAttainments: string[] = new Array;

	achievement: Achievement = new Achievement;
	experiences: Experience[] = new Array<Experience>;
	trainings: Training[] = new Array<Training>;
	
	experiencesColumns: string[] = ['positionDesignation', 'from', 'to', 'remove'];
	trainingsColumns: string[] = ['title','providerOrganizer', 'from', 'to','hours','typeOfLD', 'remove'];

	@ViewChild('eligibilityChipList') eligibilityChipList!:MatChipList;
	@ViewChild('educationChipList') educationChipList!:MatChipList;
	@ViewChild('experiencesTable') experiencesTable!: MatTable<Experience>;
	@ViewChild('trainingsTable') trainingsTable!: MatTable<Training>;

	constructor(private dialogRef: MatDialogRef<ManageComponent>,private adminService: AdminService,@Inject(MAT_DIALOG_DATA) public data:{editApplicant: Applicant, isEdit: Boolean}) {
		this.achievementForm = new FormGroup({
			applicantId: new FormControl(''),
			salaryGrade: new FormControl('',Validators.required),
			placeOfAssignment: new FormControl('',Validators.required),
			statusOfAppointment: new FormControl('',Validators.required),
			dateOfLastPromotion: new FormControl('',Validators.required),
			latestIpcrRating: new FormControl('',[Validators.min(0), Validators.max(5)]),
			eligibility: new FormControl(''),
			educationalAttainment: new FormControl('')
		});
		this.experiencesForm = new FormGroup({
			applicantId: new FormControl(''),
			positionDesignation: new FormControl('',Validators.required),
			from: new FormControl('',Validators.required),
			to: new FormControl('',Validators.required)
		});
		this.trainingsForm = new FormGroup({
			applicantId: new FormControl(''),
			title: new FormControl('',Validators.required),
			providerOrganizer: new FormControl('',Validators.required),
			from: new FormControl('',Validators.required),
			to: new FormControl('',Validators.required),
			hours: new FormControl('',Validators.required),
			typeOfLD: new FormControl('',Validators.required)
		});
	}
	ngOnInit(): void {
		if(this.data){
			this.progress = true;
			this.adminService.findAchievements(this.data.editApplicant).subscribe({
				next: res=>{
					this.achievementForm.patchValue({
						applicantId: res.achievement.applicantId,
						salaryGrade: res.achievement.salaryGrade,
						placeOfAssignment: res.achievement.placeOfAssignment,
						statusOfAppointment: res.achievement.statusOfAppointment,
						dateOfLastPromotion: res.achievement.dateOfLastPromotion,
						latestIpcrRating: res.achievement.latestIpcrRating
					});
					this.eligibilities = res.achievement.eligibility.split(',');
					this.educationalAttainments = res.achievement.educationalAttainment.split(',');
					this.achievement = res.achievement;
					this.experiences = res.experiences || new Array<Experience>;
					this.trainings = res.trainings || new Array<Training>;
					this.progress = false;
				},
				error: err =>{
					console.log(err);
				}
			});
		}
	}
	onSave(){
		if(!this.achievementForm.valid || this.educationalAttainments.length === 0 || this.eligibilities.length === 0){
			this.setStep(0);
			this.achievementForm.markAllAsTouched();
			this.eligibilityChipList.errorState = !this.eligibilities.length;
			this.educationChipList.errorState = !this.educationalAttainments.length;
		}else{
			this.progress = true;
			this.achievementForm.value.applicantId = this.applicant.id;
			this.achievementForm.value.eligibility =  this.eligibilities.join(',');
			this.achievementForm.value.educationalAttainment =  this.educationalAttainments.join(',');
			this.experiencesForm.value.applicantId = this.applicant.id;
			this.trainingsForm.value.applicantId = this.applicant.id;
			// console.log(this.achievementForm.value);
			// this.experiences.forEach( experience => {
			// 	console.log(experience);
			// });
			// this.trainings.forEach(training => {
			// 	console.log(training);
			// });
			if(!this.data){
				this.adminService.createAchievement(this.achievementForm.value).subscribe({
					next: res => {
						this.saveTrainAndExp();
					}, error: err => { console.log(err) }
				});
			}else{
				this.adminService.updateAchievement(this.achievementForm.value).subscribe({
					next: res => {
						this.adminService.removeTrainings(this.applicant.id).subscribe();
						this.adminService.removeExperiences(this.applicant.id).subscribe();
						this.saveTrainAndExp();
					}, error: err => { console.log(err) }
				});
			}
		}
	}
	// Save experiences and trainings
	saveTrainAndExp() :void{
		if(this.experiences.length > 0){
			this.experiences.forEach((experience, index, array) => {
				this.adminService.createExperience(experience).subscribe({
					next: res => {
						if(index === array.length - 1){
							if(this.trainings.length > 0){
								this.trainings.forEach((training, index, array) => {
									this.adminService.createTraining(training).subscribe({
										next: res => {
											if(index === array.length - 1){
												this.progress = false;
												this.dialogRef.close(this.applicant);
											}
										}, error: err => { console.log(err) }
									});
								});
							}else{
								this.progress = false;
								this.dialogRef.close(this.applicant);
							}
						}
					}, error: err => { console.log(err) }
				});
			});
		}else if(this.trainings.length > 0){
			this.trainings.forEach((training, index, array) => {
				this.adminService.createTraining(training).subscribe({
					next: res => {
						if(index === array.length - 1){
							this.progress = false;
							this.dialogRef.close(this.applicant);
						}
					}, error: err => { console.log(err) }
				});
			});
		}else{
			this.progress = false;
			this.dialogRef.close(this.applicant);
		}
	}
	//Eligibiiligy button events
	addEligibility(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		if (value) {
			if(this.eligibilities.indexOf(value) < 0){
				this.eligibilities.push(value);
			}
		}
		event.chipInput!.clear();
	}
	removeEligibility(eligibility: string): void {
		const index = this.eligibilities.indexOf(eligibility);
		if (index >= 0) {
			this.eligibilities.splice(index, 1);
		}
	}
	//Education button events
	addEducation(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();
		if (value) {
		  this.educationalAttainments.push(value);
		}
		event.chipInput!.clear();
	}
	removeEducation(education: string): void {
		const index = this.educationalAttainments.indexOf(education);
		if (index >= 0) {
			this.educationalAttainments.splice(index, 1);
		}
	}
	//Experience button events
	appendExperience(formDirective: FormGroupDirective) {
		if(this.experiencesForm.valid){
			this.experiences.push({
				applicantId: this.applicant.id, 
				positionDesignation: this.experiencesForm.value.positionDesignation, 
				from: this.experiencesForm.value.from,
				to: this.experiencesForm.value.to
			});
			this.experiencesTable.renderRows();
			formDirective.resetForm();
		}
	}
	removeExperience(index: number){
		if(index >= 0){
			this.experiences.splice(index,1);
			this.experiencesTable.renderRows();
		}
	}
	//Training button events
	appendTraining(formDirective: FormGroupDirective) {
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
			formDirective.resetForm();
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
			if(!this.achievementForm.valid || this.educationalAttainments.length === 0 || this.eligibilities.length === 0){
				this.achievementForm.markAllAsTouched();
				this.eligibilityChipList.errorState = !this.eligibilities.length;
				this.educationChipList.errorState = !this.educationalAttainments.length;
			}else{
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
