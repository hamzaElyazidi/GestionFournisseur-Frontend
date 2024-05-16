import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../services/manager.service";
import {catchError, Observable, throwError} from "rxjs";
import {Project} from "../model/project.model";
import {Manager} from "../model/manager.model";
import {AsyncPipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {Supplier} from "../model/supplier.model";
import {SecurityService} from "../services/security.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    DecimalPipe,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  managers!:Observable<Array<Manager>>
  searchFormGroup: FormGroup | undefined
  errorMessage!: string;
  pagedManagers: Manager[] = [];
  pageSize: number = 5;
  currentPage: number = 0;
  maxPage: number = 0;


  constructor(private managerService : ManagerService,public secService : SecurityService) {
   }
    ngOnInit(): void {
    this.managers = this.managerService.getAllManagers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    )
      this.managers.subscribe((data: Manager[]) => {
        this.pagedManagers = this.getPage(data, this.currentPage);
        this.maxPage = Math.ceil(data.length / this.pageSize) - 1;
      });
    }

  handleSearchManagers() {

  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.managers.subscribe((data: Manager[]) => {
        this.pagedManagers = this.getPage(data, this.currentPage);
      });
    }
  }
  nextPage(): void {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
      this.managers.subscribe((data: Manager[]) => {
        this.pagedManagers = this.getPage(data, this.currentPage);
      });
    }
  }

  getPage(data: Manager[], pageNumber: number): Manager[] {
    const startIndex = pageNumber * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return data.slice(startIndex, endIndex);
  }
}
