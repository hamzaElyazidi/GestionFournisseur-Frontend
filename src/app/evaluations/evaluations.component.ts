import {Component, OnInit} from '@angular/core';
import {EvaluationService} from "../services/evaluation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {Evaluation} from "../model/evaluation.model";
@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent implements OnInit{
  evaluationId : string
 // evaluation_score : number=0
  errorMessage!: string;
  evaluation :Evaluation | undefined
  constructor(private evaluationService : EvaluationService ,  private router : Router , private route : ActivatedRoute) {
     this.evaluationId = this.route.snapshot.params['evaluationId'];

  }
    ngOnInit(): void {
      this.loadEvaluation()
    }
  loadEvaluation() {
    const evaluationId = this.evaluationId; // Example evaluation ID, replace with the actual ID
    this.evaluationService.getEvaluation(Number(evaluationId)).subscribe({
      next: (evaluation) => {
        this.evaluation = evaluation;
      },
      error: err => console.log(err)
    });
  }

}
