import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import { NewSupplierComponent } from './new-supplier/new-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { ProjectsComponent } from './projects/projects.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { NewEvaluationComponent } from './new-evaluation/new-evaluation.component';
import { FooterComponent } from './footer/footer.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SupplierChart1Component } from './supplier-details/supplier-shart1/supplier-chart1.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
export function initializeKeycloak(kcService : KeycloakService)
{
  return ()=>{
    kcService.init({
      config: {
        realm : "supplier-realm" ,
        clientId : "supplier-client" ,
        url : "http://localhost:8080"
      },
      initOptions : {
        onLoad : "check-sso" ,
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
            }
    })
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SuppliersComponent,
    NewSupplierComponent,
    EditSupplierComponent,
    ProjectsComponent,
    EvaluationsComponent,
    NewProjectComponent,
    NewEvaluationComponent,
    FooterComponent,
    SupplierDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SupplierChart1Component,
   KeycloakAngularModule
  ],
  providers: [
     {provide : APP_INITIALIZER , deps :[KeycloakService],useFactory:initializeKeycloak,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

