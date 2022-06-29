import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tutorial } from 'src/app/models/tutorial';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss']
})
export class AddTutorialComponent implements OnInit {
  tutorialForm!: FormGroup;
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  saved = false;
  constructor(private tutorialService: TutorialService) { }
  
  ngOnInit(): void {
    this.tutorialForm = this.createFormGroup();
  }
  
  saveTutorial(): void {
    this.tutorialService.create(this.tutorialForm.value)
    .subscribe({
        next: (res) => {
        console.log(res);
        this.saved = true;
      },
      error: (e) => console.error(e)
    });
  }
  createFormGroup(): FormGroup{
      return new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
    });
  }
  newTutorial(): void {
    this.saved = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }
}
