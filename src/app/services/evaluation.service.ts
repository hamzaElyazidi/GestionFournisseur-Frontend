import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Evaluation } from '../model/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {



  backendHost:string="http://localhost:8009"
  constructor(private http:HttpClient) {}
  // }
  // public getEvaluationScore(evaluationId: number): Observable<number> {
  //   return this.http.get<number>(this.backendHost+"/evaluation/evaluation_score?evaluationId="+evaluationId)
  // }
  // public getEvaluationDetails(evaluationId: number):Observable<Array<Score1>> {
  //   return this.http.get<Array<Score1>>(this.backendHost+"/evaluation/scores?evaluationId="+evaluationId)
  // }
  // public createEvaluation(projectIdRequest: ProjectIdRequest): Observable<number> {
  //   return this.http.post<number>(this.backendHost+"/evaluation",projectIdRequest)
  // }
  // public saveScore(score:Score1):Observable<Score1> {
  //  return this.http.post<Score1>(this.backendHost+"/evaluation/new-score",score)
  // }

  public createEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    console.log("in service")
    console.log(evaluation)
    return this.http.post<Evaluation>(this.backendHost+"/evaluationV2",evaluation)
  }
  // public calculateEvaluationScore(evaluationId: number) {
  //   return this.http.get(this.backendHost+"evaluation/calculate?evaluationId="+evaluationId)
  // }

  public getEvaluation(evaluationId: number) : Observable<Evaluation>  {
    console.log()
    return this.http.get<Evaluation>(`${this.backendHost}/evaluations/${evaluationId}`)
  }

}
