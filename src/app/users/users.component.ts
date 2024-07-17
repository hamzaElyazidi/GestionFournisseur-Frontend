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
import {Buyer} from "../model/buyer.model";

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
  buyers!:Observable<Array<Buyer>>
  searchFormGroup: FormGroup | undefined
  errorMessage!: string;
  pagedManagers: Manager[] = [];
  pagedBuyer : Buyer[] = [] ;

  pageSize: number = 5;
  currentPage: number = 0;
  maxPage: number = 0;

  currentPageBuyers : number = 0 ;
  maxPageBuyers : number = 0 ;


  constructor(private managerService : ManagerService,public secService : SecurityService) {
   }
    ngOnInit(): void {
    this.managers = this.managerService.getAllManagers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    )

      this.buyers = this.managerService.getAllBuyers().pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err)
        })
      )


      this.managers.subscribe((data: Manager[]) => {
        this.pagedManagers = this.getPage(data, this.currentPage);
        this.maxPage = Math.ceil(data.length / this.pageSize) - 1;
      });

      this.buyers.subscribe((data: Buyer[]) => {
        this.pagedBuyer = this.getPage(data, this.currentPageBuyers);
        this.maxPageBuyers = Math.ceil(data.length / this.pageSize) - 1;
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

  previousPageBuyer(): void {
    if (this.currentPageBuyers > 0) {
      this.currentPageBuyers--;
      this.buyers.subscribe((data: Buyer[]) => {
        this.pagedBuyer = this.getPage(data, this.currentPageBuyers);
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

  nextPageBuyer(): void {
    if (this.currentPageBuyers < this.maxPageBuyers) {
      this.currentPageBuyers++;
      this.buyers.subscribe((data: Buyer[]) => {
        this.pagedBuyer = this.getPage(data, this.currentPageBuyers);
      });
    }
  }

  getPage(data: Manager[], pageNumber: number): Manager[] {
    const startIndex = pageNumber * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return data.slice(startIndex, endIndex);
  }

  getPageBuyer(data: Buyer[], pageNumber: number): Buyer[] {
    const startIndex = pageNumber * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return data.slice(startIndex, endIndex);
  }

  handleDeleteProjectManager(m: Manager) {
    
  }
}
