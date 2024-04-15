import {Score} from "./score.model";

export interface Evaluation {
  id? : number,
  evaluation_date? : Date,
  scores? : Score[],
  project_id? : number ,
  evaluation_score? : number
}
