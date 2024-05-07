import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http" ;
import {catchError, map, min, Observable, throwError} from "rxjs";
import {Supplier} from "../model/supplier.model";
@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  backendHost:string="http://localhost:8009"
  constructor(private http:HttpClient) {
  }
  public getSuppliers() : Observable<Array<Supplier>>{
    return  this.http.get<Array<Supplier>>(this.backendHost+"/suppliers")
    }
  public saveSupplier(supplier : Supplier) : Observable<Supplier>{
    return  this.http.post<Supplier>(this.backendHost+"/suppliers",supplier);
  }
  public deleteSupplier(id : number) {
    return this.http.delete(this.backendHost+"/suppliers/"+id);
  }
  public getSupplierByid(id : number){
    return this.http.get<Supplier>(this.backendHost+"/suppliers/"+id) ;
  }
  updateSupplier(supplier: Supplier):Observable<Supplier> {
    return this.http.put<Supplier>(this.backendHost+"/suppliers",supplier)
  }

  public searchSupplier(keyword : string) : Observable<Array<Supplier>>{
    return  this.http.get<Array<Supplier>>(this.backendHost+"/suppliers/search?keyword="+keyword);
  }
  public filterByMinRating(minRating: number): Observable<Array<Supplier>>{
    if (minRating==null)     return this.http.get<Array<Supplier>>(this.backendHost+"/suppliers/filter?minRating="+0)
    return this.http.get<Array<Supplier>>(this.backendHost+"/suppliers/filter?minRating="+minRating)
  }

}
