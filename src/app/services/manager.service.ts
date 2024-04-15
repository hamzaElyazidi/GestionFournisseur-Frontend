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
    return this.http.get<Array<Manager>>(this.backendHost+"/managers")
  }

}
