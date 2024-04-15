import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../model/quesion.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  backendHost:string="http://localhost:8009"
  constructor(private http:HttpClient) {
  }
  getAllQuestions():Observable<Array<Question>> {
    return this.http.get<Array<Question>>(this.backendHost+"/questions")
  }
}
