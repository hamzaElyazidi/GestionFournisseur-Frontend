import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {EvaluationService} from "../services/evaluation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {Supplier} from "../model/supplier.model";
import {Project} from "../model/project.model";
import {Evaluation} from "../model/evaluation.model";
import {AsyncPipe, DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {SecurityService} from "../services/security.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit{
  projectId:string
  project! : Observable<Project>
  evaluation? : Observable<Evaluation>
  errorMessage! : string


  constructor(public router :Router ,public secService : SecurityService,public keycloak:KeycloakService,private projectService : ProjectService , private evaluationService : EvaluationService, private route :ActivatedRoute) {
     this.projectId = this.route.snapshot.params['projectId'];

   }
     ngOnInit(): void{
     this.project =  this.projectService.getProjectByid(Number(this.projectId)).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        }))
       this.project.subscribe({
         next:value=>{
          this.evaluation=  this.evaluationService.getEvaluation(value.evaluationId)
            .pipe(
           catchError(err => {
             this.errorMessage = err.message;
             return throwError(err);
           }))

         }
       })


     }

  handleAddEvaluationToProject(p: Project) {
    this.router.navigateByUrl("/evaluations/new-evaluation/"+p.id)
  }



}
