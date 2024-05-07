import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Manager} from "../model/manager.model";
import {HttpClient} from "@angular/common/http";

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
  getManagerByUserId(userId:string):Observable<Manager> {
    return this.http.get<Manager>(this.backendHost+"/managers?userId="+userId)
  }
  createManger(manager: Manager) {
    return this.http.post<Manager>(this.backendHost+"/managers",manager)
  }
}
