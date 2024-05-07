import {Component, OnInit, ViewChild} from '@angular/core';
import {SupplierService} from '../services/supplier.service'
import {catchError, filter, map, Observable, throwError} from "rxjs";
import {Supplier} from "../model/supplier.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SecurityService} from "../services/security.service";
import {SupplierDetailsComponent} from "../supplier-details/supplier-details.component";
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
  totalNumberOfProjects! : number
  totalNumberOfSuppliers! : number

  averageRating! : number
//
  pagedSuppliers: Supplier[] = [];
  pageSize: number = 5;
  currentPage: number = 0;
  maxPage: number = 0;
  constructor(private modalService: NgbModal,private supplierService: SupplierService, private fb: FormBuilder , private router:Router , public secService : SecurityService) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
    this.filterByRatingFormGroup = this.fb.group({
      minRating: this.fb.control(0)
    })
    this.loadSuppliers();
  }
  loadSuppliers(): void {
    this.suppliers = this.supplierService.getSuppliers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      }),
      map(array => array.slice().sort((a, b) => {
        if (a.rating > b.rating) return -1;
        else if (a.rating < b.rating) return 1;
        else return 0;
      }))
    );

    this.suppliers.subscribe((data: Supplier[]) => {
      this.pagedSuppliers = this.getPage(data, this.currentPage);
      this.maxPage = Math.ceil(data.length / this.pageSize) - 1;
    });
    this.suppliers.subscribe((data)=>{
      this.totalNumberOfProjects = data.reduce((accum,currentValue)=>{
        return currentValue.number_of_projects + accum
      },0)
    })
    this.suppliers.subscribe((data)=>{
      this.totalNumberOfSuppliers = data.length
    })
    this.suppliers.subscribe((data)=>{
      let count = 0 ;
      let sum = data.reduce((accum,currentValue)=>{
        if(currentValue.rating != 0)
        {
          count++
          return currentValue.rating + accum
        }
        else
          return accum
      },0)
      this.averageRating = sum / count  ;
    })
  }
  handleSearchSupplier() {
    console.log("HERE")
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
    this.suppliers.subscribe((data: Supplier[]) => {
      this.pagedSuppliers = this.getPage(data, this.currentPage);
      this.maxPage = Math.ceil(data.length / this.pageSize) - 1;
    });
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
    this.suppliers.subscribe((data: Supplier[]) => {
      this.pagedSuppliers = this.getPage(data, this.currentPage);
      this.maxPage = Math.ceil(data.length / this.pageSize) - 1;
    });
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

  //
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.suppliers.subscribe((data: Supplier[]) => {
        this.pagedSuppliers = this.getPage(data, this.currentPage);
      });
    }
  }
  nextPage(): void {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
      this.suppliers.subscribe((data: Supplier[]) => {
        this.pagedSuppliers = this.getPage(data, this.currentPage);
      });
    }
  }

  getPage(data: Supplier[], pageNumber: number): Supplier[] {
    const startIndex = pageNumber * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return data.slice(startIndex, endIndex);
  }
  //
  protected readonly filter = filter;
  openSupplierDetailsDialog(supplierId: string): void {
    const modalRef = this.modalService.open(SupplierDetailsComponent, {
      centered: true, // Center the dialog vertically and horizontally
      size: 'xl' // Set the dialog size to extra large
    });
    modalRef.componentInstance.supplierId = supplierId;
  }
}
