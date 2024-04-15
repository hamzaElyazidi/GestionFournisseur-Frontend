import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {EvaluationService} from "../services/evaluation.service";
import {QuestionService} from "../services/question.service";
import {Evaluation} from "../model/evaluation.model";
import {Score} from "../model/score.model";
@Component({
  selector: 'app-new-evaluation',
  templateUrl: './new-evaluation.component.html',
  styleUrls: ['./new-evaluation.component.css']
})
export class NewEvaluationComponent implements OnInit{
  newEvaluationFormGroup! : FormGroup;
  projectId! : string
  constructor(private fb : FormBuilder , private route : ActivatedRoute ,private evaluationService : EvaluationService , private questionService : QuestionService ) {
    this.projectId = this.route.snapshot.params['projectId'];
  }
  ngOnInit(): void {
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
      score : formValues['quest1'],
    }
    let score2: Score = {
      question_id : 2 ,
      score : formValues['quest2'],
    }
    let score3 : Score = {
      question_id : 3 ,
      score : formValues['quest3'],
    }
    let score4 : Score = {
      question_id : 4 ,
      score : formValues['quest4'],
    }
    let scores : Score[] = [score1,score2,score3,score4]
    let evaluation : Evaluation = {
      id:1,
      project_id:Number(this.projectId) ,
      scores : scores
    }
    console.log(evaluation)
    this.evaluationService.createEvaluation(evaluation).subscribe({
      next:value => console.log("Operation Completed") ,
      error:err => console.log("error")
    })
  }
}
