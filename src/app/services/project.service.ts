import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "../model/project.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  backendHost:string="http://localhost:8009"
  constructor(private http:HttpClient) {
  }
  getProjectsOfGivenSupplier(supplierId : number):Observable<Array<Project>> {
    return this.http.get<Array<Project>>(this.backendHost+"/projects?supplierId="+supplierId);
  }
  public saveProject(project : Project) : Observable<Project>{
    return  this.http.post<Project>(this.backendHost+"/projects",project);
  }
   public deleteProject(id:number) {
    return this.http.delete(this.backendHost+"/projects/"+id);
  }
  getAllProjects():Observable<Array<Project>> {
    return this.http.get<Array<Project>>(this.backendHost+"/projects");
  }
  deleteEvaluation(id: number) {
    return this.http.delete(this.backendHost+"/evaluations/"+id);
  }


}
