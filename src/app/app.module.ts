import {APP_INITIALIZER, NgModule, OnInit} from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import KeycloakAdminClient from 'keycloak-admin';
import {SupplierShart2Component} from "./supplier-details/supplier-shart2/supplier-shart2.component";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";
import {SliderModule} from "primeng/slider";
// import {NotificationService} from "./services/notification.service";
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
    SupplierDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SupplierChart1Component,
    KeycloakAngularModule,
    MatPaginatorModule,
    SupplierShart2Component,
    MatStepper,
    MatStep,
    MatLabel,
    MatFormField,
    BrowserAnimationsModule,
    MatButton,
    MatStepLabel,
    MatInput,
    MatStepperNext,
    MatStepperPrevious,
    MatDialogContent,
    MatDialogActions,
    ToastrModule.forRoot(),
    FormsModule,
    SliderModule,


// ToastrModule added here
  ],
  providers: [
    {provide : APP_INITIALIZER , deps :[KeycloakService],useFactory:initializeKeycloak,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit{
  constructor() {}
  ngOnInit(): void {
    // The NotificationService is instantiated and will start listening for notifications
  }
}

