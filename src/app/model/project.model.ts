export interface Project{
  id:number
  n_contract:string
  description:string
  startsAt: Date
  endsAt: Date
  supplierId:number
  projectManagerId:number
  projectManagerName:string
  userId : string
  supplierName : string
  evaluationId : number
  evaluation_score : number
  evaluation_date : Date
}
