import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SuppliersComponent} from "./suppliers/suppliers.component"
import {NewSupplierComponent} from "./new-supplier/new-supplier.component";
import {EditSupplierComponent} from "./edit-supplier/edit-supplier.component";
import {ProjectsComponent} from "./projects/projects.component";
import {EvaluationsComponent} from "./evaluations/evaluations.component";
import {NewProjectComponent} from "./new-project/new-project.component";
import {NewEvaluationComponent} from "./new-evaluation/new-evaluation.component";
import {SupplierDetailsComponent} from "./supplier-details/supplier-details.component";
import {AuthGuard} from "./guards/auth.guard";
import {HommeComponent} from "./homme/homme.component";
import {AppComponent} from "./app.component";
import {MyProjectsComponent} from "./my-projects/my-projects.component";
import {CreateUSerComponent} from "./create-user/create-user.component";
import {UsersComponent} from "./users/users.component";
import {ProjectDetailsComponent} from "./project-details/project-details.component";
const routes: Routes = [
 // {path: '', component: AppComponent,canActivate:[AuthGuard],data:{roles:['USER']} },
  {path : "suppliers" , component : SuppliersComponent ,canActivate:[AuthGuard],data:{roles:['BUYER' , 'USER']}} ,
  {path : "new-supplier" , component : NewSupplierComponent } ,
  {path : "supplier-details/:supplierId" , component : SupplierDetailsComponent },
  {path : "editSupplier/:id" , component : EditSupplierComponent } ,
  {path : "projects/:supplierId" , component : ProjectsComponent,canActivate:[AuthGuard],data:{roles:['USER']} } ,
  {path : "evaluations/:evaluationId" , component : EvaluationsComponent } ,
  // {path : "new-project/:supplierId" , component : NewProjectComponent } ,
  {path : "new-project" , component : NewProjectComponent } ,
  {path : "evaluations/new-evaluation/:projectId" , component : NewEvaluationComponent },
  {path : "my-projects" , component : MyProjectsComponent },
  {path : "create-user" , component : CreateUSerComponent },
  {path : "users" , component : UsersComponent},
  {path : "project-details/:projectId" , component : ProjectDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
