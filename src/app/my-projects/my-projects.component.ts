import {Component, OnInit} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Project} from "../model/project.model";
import {ProjectService} from "../services/project.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EvaluationService} from "../services/evaluation.service";
import {KeycloakService} from "keycloak-angular";
import {AsyncPipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {SecurityService} from "../services/security.service";

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    DecimalPipe,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent implements OnInit{
  projects!:Observable<Array<Project>>
  errorMessage!: string;
  pagedProjects: Project[] = [];
  pageSize: number = 5;
  currentPage: number = 0;
  maxPage: number = 0;
  searchFormGroup: FormGroup | undefined


  constructor(public secService: SecurityService,private toastr: ToastrService,private fb : FormBuilder,private router : Router,private projectService : ProjectService,private keycloakService: KeycloakService)   {
  }

  ngOnInit(): void {
    // if (this.keycloakService.getKeycloakInstance().hasRealmRole('ADMIN')) this.router.navigateByUrl("/users")
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })    // this.projects= this.projectService.getProjectsByUserId(this.keycloakService.getKeycloakInstance()?.idTokenParsed?.sub||'').pipe(
    //   catchError(err => {
    //     this.errorMessage = err.message;
    //     return throwError(err)
    //   })
    // )
    this.loadProjects();
  }
  loadProjects(): void {
    let roles = this.keycloakService.getKeycloakInstance().tokenParsed?.realm_access?.roles
    let usertype = roles?.includes('USER') ? 'MANAGER' : roles?.includes('BUYER') ? 'BUYER' : '';
      //.hasRealmRole('USER ') ? 'MANAGER' : this.keycloakService.getKeycloakInstance().hasRealmRole('BUYER ') ? 'BUYER' : "" ;
    console.log("HEREERER" + usertype)
    this.projects = this.projectService.getProjectsByUserId(this.keycloakService.getKeycloakInstance()?.idTokenParsed?.sub||'',usertype).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      }),
      map(projects => projects.sort((a, b) => projects.indexOf(b) - projects.indexOf(a)))
      // map(array => array.slice().sort((a, b) => {
      //   if (a.evaluation_score > b.evaluation_score) return -1;
      //   else if (a.evaluation_score < b.evaluation_score) return 1;
      //   else return 0;
      // }))
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
  handleAddEvaluationToProject(p: Project) {
    this.router.navigateByUrl("/evaluations/new-evaluation/"+p.id)
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
  handleGetDetailsOfProject(p : Project) {
    this.router.navigateByUrl("/project-details/"+p.id)
  }

  handleDeleteEvaluation(p: Project) {
    const isConfirmed = window.confirm("Are you sure you want to delete this Evaluation? This action is irreversible.");
    if (isConfirmed) {
      this.projectService.deleteEvaluation(p.id).subscribe({
          next:resp=>{
            this.toastr.warning('Evaluation deleted successfully!', 'Success')
            this.loadProjects();
          },
          error:err => {console.log(err)}
        }
      )
    }
  }
  handleDeleteProject(p: Project) {
    const isConfirmed = window.confirm("Are you sure you want to delete this project? This action is irreversible.");
    if (isConfirmed){this.projectService.deleteProject(p.id).subscribe({
        next:resp=>{
          this.toastr.error('Project deleted successfully!', 'Success')
          this.loadProjects()
        },
        error:err => {console.log(err)}
      }
    )
  }
  }

  handleEditProject(p: Project) {
    this.router.navigateByUrl("/editProject/" + p.id)

  }
}
