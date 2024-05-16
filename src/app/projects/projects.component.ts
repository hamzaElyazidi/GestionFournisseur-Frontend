import {Component, OnInit} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Project} from "../model/project.model";
import {ProjectService} from "../services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EvaluationService} from "../services/evaluation.service";
import {Supplier} from "../model/supplier.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  searchFormGroup: FormGroup | undefined
  projects!:Observable<Array<Project>>
  supplierId:string
  errorMessage!: string;
  pagedProjects: Project[] = [];
  pageSize: number = 5;
  currentPage: number = 0;
  maxPage: number = 0;
  constructor(private fb : FormBuilder ,private projectService : ProjectService , private router : Router , private route : ActivatedRoute , private evaluationService:EvaluationService)   {
    this.supplierId = this.route.snapshot.params['supplierId'];
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
    // this.projects= this.projectService.getProjectsOfGivenSupplier(Number(this.supplierId)).pipe(
    //   catchError(err => {
    //     this.errorMessage = err.message;
    //     return throwError(err)
    //   })
    // )
    this.loadProjects();
  }
  loadProjects(): void {
    this.projects = this.projectService.getProjectsOfGivenSupplier(Number(this.supplierId)).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      }),
      map(array => array.slice().sort((a, b) => {
        if (a.evaluation_score > b.evaluation_score) return -1;
        else if (a.evaluation_score < b.evaluation_score) return 1;
        else return 0;
      }))
    );

    this.projects.subscribe((data: Project[]) => {
      this.pagedProjects = this.getPage(data, this.currentPage);
      this.maxPage = Math.ceil(data.length / this.pageSize) - 1;
    });
    // this.projects.subscribe((data)=>{
    //   this.totalNumberOfProjects = data.reduce((accum,currentValue)=>{
    //     return currentValue.number_of_projects + accum
    //   },0)
    // })

  }




  handleGetDetailsOfProject(p : Project) {
    this.router.navigateByUrl("/project-details/"+p.id)
  }


  HandleGetDetailsOfEvaluation(p: Project) {
    this.router.navigateByUrl("/evaluations/"+p.evaluationId)
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


  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.projects.subscribe((data: Project[]) => {
        this.pagedProjects = this.getPage(data, this.currentPage);
      });
    }
  }
  nextPage(): void {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
      this.projects.subscribe((data: Project[]) => {
        this.pagedProjects = this.getPage(data, this.currentPage);
      });
    }
  }

  getPage(data: Project[], pageNumber: number): Project[] {
    const startIndex = pageNumber * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return data.slice(startIndex, endIndex);
  }
  //

  handleSearchProject() {
    let kw = this.searchFormGroup?.value.keyword;

  }
}
