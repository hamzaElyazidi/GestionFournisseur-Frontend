import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Project} from "../model/project.model";
import {ProjectService} from "../services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EvaluationService} from "../services/evaluation.service";
import {KeycloakService} from "keycloak-angular";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent implements OnInit{
  projects!:Observable<Array<Project>>
  errorMessage!: string;

  constructor(private projectService : ProjectService,private keycloakService: KeycloakService)   {
  }

  ngOnInit(): void {
    this.projects= this.projectService.getProjectsByUserId(this.keycloakService.getKeycloakInstance()?.idTokenParsed?.sub||'').pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    )
    }
}
