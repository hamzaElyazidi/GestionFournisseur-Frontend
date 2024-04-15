import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Project} from "../model/project.model";
import {ProjectService} from "../services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EvaluationService} from "../services/evaluation.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects!:Observable<Array<Project>>
  supplierId:string
  errorMessage!: string;


  constructor(private projectService : ProjectService , private router : Router , private route : ActivatedRoute , private evaluationService:EvaluationService)   {
    this.supplierId = this.route.snapshot.params['supplierId'];
  }

  ngOnInit(): void {
    this.projects= this.projectService.getProjectsOfGivenSupplier(Number(this.supplierId)).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    )
  }

  HandleGetDetailsOfEvaluation(p: Project) {
    this.router.navigateByUrl("/evaluations/"+p.evaluationId)
  }
  handleAddEvaluationToProject(p: Project) {
   this.router.navigateByUrl("/evaluations/new-evaluation/"+p.id)

  }
  handleDeleteProject(p: Project) {
    this.projectService.deleteProject(p.id).subscribe({
      next:resp=>{
        this.projects= this.projectService.getProjectsOfGivenSupplier(Number(this.supplierId)).pipe(
          catchError(err => {
            this.errorMessage = err.message;
            return throwError(err)
          })
        )
      },
      error:err => console.log(err)
    })
  }

  handleGetAllProjects() {
    this.projects = this.projectService.getAllProjects().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    );
  }


  handleDeleteEvaluation(p: Project) {
    this.projectService.deleteEvaluation(p.id).subscribe({
        next:resp=>{
          this.projects= this.projectService.getProjectsOfGivenSupplier(Number(this.supplierId)).pipe(
            catchError(err => {
              this.errorMessage = err.message;
              return throwError(err)
            })
          )
        },
        error:err => {console.log(err)}
      }
    )

  }
}
