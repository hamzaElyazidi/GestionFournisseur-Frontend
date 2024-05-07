import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../services/manager.service";
import {catchError, Observable, throwError} from "rxjs";
import {Project} from "../model/project.model";
import {Manager} from "../model/manager.model";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  managers!:Observable<Array<Manager>>
  errorMessage!: string;


  constructor(private managerService : ManagerService) {
   }
    ngOnInit(): void {
    this.managers = this.managerService.getAllManagers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    )
    }
}
