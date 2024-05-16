import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "../model/project.model";
import {HttpClient} from "@angular/common/http";
import {Evaluation} from "../model/evaluation.model";

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
  getEvaluationsOfGivenSupplier(supplierId: number) {
    return this.http.get<Array<Evaluation>>(this.backendHost+"/evaluations?supplierId="+supplierId)
  }

  getProjectsByUserId(userId : string , usertype:string) {
    console.log('here :   ' + userId)
    console.log('here2 :   ' + usertype)
    return this.http.get<Array<Project>>(this.backendHost+"/projects/my-projects?userId="+userId+"&usertype="+usertype) ;
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
  getProjectByid(id: number) {
    return this.http.get<Project>(this.backendHost+"/projects/"+id)
  }


}
