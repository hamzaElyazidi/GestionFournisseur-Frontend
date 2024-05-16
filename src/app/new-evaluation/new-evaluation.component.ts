import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EvaluationService} from "../services/evaluation.service";
import {QuestionService} from "../services/question.service";
import {Evaluation} from "../model/evaluation.model";
import {Score} from "../model/score.model";
import {ToastrService} from "ngx-toastr";

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
  constructor(private router : Router ,private toastr: ToastrService ,private fb : FormBuilder , private route : ActivatedRoute ,private evaluationService : EvaluationService , private questionService : QuestionService ) {
    this.projectId = this.route.snapshot.params['projectId'];
  }
  ngOnInit(): void {
    console.log(this.projectId)
    this.newEvaluationFormGroup = this.fb.group({
      question1: this.fb.control(null),
      question2: this.fb.control(null),
      question3: this.fb.control(null),
      question4: this.fb.control(null),
    });
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
    let scores : Score[] = [score1,score2,score3,score4]
    let evaluation : Evaluation = {
      id:1,
      project_id:Number(this.projectId) ,
      scores : scores
    }
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
}
