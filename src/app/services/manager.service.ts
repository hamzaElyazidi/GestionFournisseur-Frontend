import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Manager} from "../model/manager.model";
import {HttpClient} from "@angular/common/http";
import {Buyer} from "../model/buyer.model";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {


  backendHost:string="http://localhost:8009"
  constructor(private http:HttpClient) {
  }
  getAllManagers():Observable<Array<Manager>> {
    return this.http.get<Array<Manager>>(this.backendHost+"/allManagers")
  }
  getAllBuyers():Observable<Array<Buyer>> {
    return this.http.get<Array<Buyer>>(this.backendHost+"/allBuyers")
  }
  getManagerByUserId(userId:string):Observable<Manager> {
    return this.http.get<Manager>(this.backendHost+"/managers?userId="+userId)
  }
  getMangerByid(id: number): Observable<Manager> {
    return this.http.get<Manager>(this.backendHost+"/managers/"+id)
  }
  getBuyerByUserId(userId:string):Observable<Buyer> {
    return this.http.get<Buyer>(this.backendHost+"/buyers?userId="+userId)
  }
  createManger(manager: Manager) {
    return this.http.post<Manager>(this.backendHost+"/managers",manager)
  }
  createBuyer(buyer: Buyer) {
    return  this.http.post<Buyer>(this.backendHost+"/buyers",buyer)
  }

}
