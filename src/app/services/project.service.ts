import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "../model/project.model";
import {HttpClient} from "@angular/common/http";
import {Evaluation} from "../model/evaluation.model";
import {Supplier} from "../model/supplier.model";
import {ProjectEvent} from "./websocket.service";

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
  public getProjectEventsByManagerId(managerId : number) {
    return this.http.get<Array<ProjectEvent>>(this.backendHost+"/projectEvents/"+managerId) ;
  }

  public deleteProject(id:number) {
    return this.http.delete(this.backendHost+"/projects/"+id);
  }
  deleteProjectEvent(id: number) {
    return this.http.delete(this.backendHost+"/projectEvents/"+id);
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
  updateProjectDates(project: Project) {
   return this.http.put(this.backendHost+"/projects/update_dates",project)
  }
  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.backendHost+"/projects",project)
  }
}
