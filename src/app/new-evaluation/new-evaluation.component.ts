import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EvaluationService} from "../services/evaluation.service";
import {QuestionService} from "../services/question.service";
import {Evaluation} from "../model/evaluation.model";
import {Score} from "../model/score.model";
import {ToastrService} from "ngx-toastr";
import {ProjectService} from "../services/project.service";
import {Project} from "../model/project.model";

@Component({
  selector: 'app-new-evaluation',
  templateUrl: './new-evaluation.component.html',
  styleUrls: ['./new-evaluation.component.css']
})
export class NewEvaluationComponent implements OnInit{
  newEvaluationFormGroup! : FormGroup;
  projectId! : string
  sliderValue: number = 50;
  sliderValue2: number = 50;
  sliderValue3: number = 50;
  sliderValue4: number = 50;
  sliderValue5: number = 50;

  constructor(private projectService : ProjectService,private router : Router ,private toastr: ToastrService ,private fb : FormBuilder , private route : ActivatedRoute ,private evaluationService : EvaluationService , private questionService : QuestionService ) {
    this.projectId = this.route.snapshot.params['projectId'];
  }
  ngOnInit(): void {
    console.log(this.projectId)
    this.newEvaluationFormGroup = this.fb.group({
      question1: this.fb.control(null,Validators.required),
      question2: this.fb.control(null,Validators.required),
      question3: this.fb.control(null,Validators.required),
      question4: this.fb.control(null,Validators.required),
      question5: this.fb.control(null,Validators.required),
      startsAt : this.fb.control(null,Validators.required),
      endsAt : this.fb.control(null,Validators.required),
    }, { validator: this.dateRangeValidator('startsAt', 'endsAt') });
  }
  handleAddEvaluation()
  {
    const formValues = this.newEvaluationFormGroup.value
    let score1 : Score = {
      question_id : 1 ,
      score : formValues['question1']==null?50:formValues['question1'],
    }
    let score2: Score = {
      question_id : 2 ,
      score : formValues['question2']==null?50:formValues['question2'],
    }
    let score3 : Score = {
      question_id : 3 ,
      score : formValues['question3']==null?50:formValues['question3'],
    }
    let score4 : Score = {
      question_id : 4 ,
      score : formValues['question4']==null?50:formValues['question4'],
    }
    let score5 : Score = {
      question_id : 5,
      score : formValues['question5']==null?50:formValues['question5'],
    }
    let scores : Score[] = [score1,score2,score3,score4,score5]
    let evaluation : Evaluation = {
      id:1,
      project_id:Number(this.projectId) ,
      scores : scores
    }
    let project : Project = {
      id: Number(this.projectId),
      n_contract: '',
      description: '',
      startsAt: formValues['startsAt'],
      endsAt: formValues['endsAt'],
      supplierId: 0,
      projectManagerId: 0,
      projectManagerName: '',
      buyerId: 0,
      buyerName: '',
      userId: '',
      supplierName: '',
      evaluationId: 0,
      evaluation_score: 0,
      evaluation_date: new Date(),
      amount: 0
    }
    this.projectService.updateProjectDates(project).subscribe({
      next : value => console.log("dates updated") ,
      error : err =>  console.log(err)
    });
    console.log('eval : '  +evaluation.scores?.at(0)?.score)
    this.evaluationService.createEvaluation(evaluation).subscribe({
      next:value => {
        this.toastr.success('Project Evaluated successfully!', 'Success');
        console.log(value)
        this.router.navigateByUrl("/project-details/"+this.projectId)
      },
      error:err => console.log("error")
    })
  }


  updateValue(event: Event) {
    this.sliderValue = (event.target as HTMLInputElement).valueAsNumber;
  }
  updateValue2(event: Event) {
    this.sliderValue2 = (event.target as HTMLInputElement).valueAsNumber;
  }
  updateValue3(event: Event) {
    this.sliderValue3 = (event.target as HTMLInputElement).valueAsNumber;
  }
  updateValue4(event: Event) {
    this.sliderValue4 = (event.target as HTMLInputElement).valueAsNumber;
  }
  updateValue5(event: Event) {
    this.sliderValue5 = (event.target as HTMLInputElement).valueAsNumber;
  }
  dateRangeValidator(startKey: string, endKey: string): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      const start = group.get(startKey)?.value;
      const end = group.get(endKey)?.value;

      if (start && end && start >= end) {
        return { dateRange: 'startsAt must be less than endsAt' };
      }
      return null;
    };
  }
}
