import {Component, OnInit} from '@angular/core';
import {SupplierService} from '../services/supplier.service'
import {catchError, map, Observable, throwError} from "rxjs";
import {Supplier} from "../model/supplier.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  suppliers!: Observable<Array<Supplier>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined
  filterByRatingFormGroup: FormGroup | undefined;

  constructor(private supplierService: SupplierService, private fb: FormBuilder , private router:Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
    this.filterByRatingFormGroup = this.fb.group({
      minRating: this.fb.control(0)
    })
    this.suppliers = this.supplierService.getSuppliers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    ).pipe(
      map(array => array.slice().sort((a, b) => {
        if (a.rating > b.rating) return -1 ;
        else if (a.rating < b.rating) return 1 ;
        else return 0 ;
      }))
    );
  }

  handleSearchSupplier() {
    let kw = this.searchFormGroup?.value.keyword;
    this.suppliers = this.supplierService.searchSupplier(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    ).pipe(
          map(array => array.slice().sort((a, b) => {
            if (a.rating > b.rating) return -1 ;
            else if (a.rating < b.rating) return 1 ;
            else return 0 ;
          }))
        );
  }

  handleDeleteSupplier(supplier: Supplier) {
    this.supplierService.deleteSupplier(supplier.id).subscribe({
      next:resp=>{this.handleSearchSupplier()},
      error:err => {console.log(err)}
    }
    )
  }

  handleEditSupplier(s: Supplier) {
    this.router.navigateByUrl("/editSupplier/"+s.id)
  }

  handleGetProjectsOfSupplier(s: Supplier) {
    this.router.navigateByUrl("/projects/"+s.id)
  }

  handleAddProjectToSupplier(s: Supplier) {
    this.router.navigateByUrl("/new-project/"+s.id)
  }

  handleGetSupplierDetails(s: Supplier) {
    this.router.navigateByUrl("/supplier-details/"+s.id)
  }

  handleFilterSuppliersByRating() {
    let minRating : number = this.filterByRatingFormGroup?.value.minRating;
    this.suppliers = this.supplierService.filterByMinRating(minRating).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err)
      })
    ).pipe(
      map(array => array.slice().sort((a, b) => {
        if (a.rating > b.rating) return -1 ;
        else if (a.rating < b.rating) return 1 ;
        else return 0 ;
      }))
    );
  }
}
