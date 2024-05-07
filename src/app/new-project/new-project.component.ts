import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupplierService} from "../services/supplier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagerService} from "../services/manager.service";
import {async} from "rxjs";
import {Project} from "../model/project.model";
import {ProjectService} from "../services/project.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']

})
export class NewProjectComponent implements OnInit{
  newProjectFormGroup! : FormGroup;
  supplierId! : string
  supplierName:string=""
  projectManagerName:string=""
 // managersNames:string[]=[]
  //
  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  //

  constructor(private fb : FormBuilder , private supplierService:SupplierService,private managerService:ManagerService, private router : Router , private route : ActivatedRoute , private projectService:ProjectService ,private keycloakService: KeycloakService) {
    this.supplierId = this.route.snapshot.params['supplierId'];
    const userId = this.keycloakService.getKeycloakInstance()?.idTokenParsed?.sub ;
    // managerService.getAllManagers().subscribe({
    //   next:(value)=>{
    //    this.managersNames=  value.map((manager)=>manager.first_name+' '+manager.last_name)
    //   },
    //   error:(err)=>{}
    // })


  }
    ngOnInit(): void {
      this.managerService.getManagerByUserId(this.keycloakService.getKeycloakInstance()?.idTokenParsed?.sub||"").subscribe({
        next:(value)=>{
          this.projectManagerName =  value.last_name + ' ' + value.first_name
        },
        error:(err)=>{}
      })
     this.supplierService.getSupplierByid(Number(this.supplierId)).subscribe(
        {
          next:value => {
            this.supplierName=value.name
           // console.log(this.supplierName)
          },
          error:err => {console.log(err)}
        }
      )
      this.newProjectFormGroup = this.fb.group(
        {
          n_contract : this.fb.control(null ,[Validators.required, Validators.maxLength(50)]),
          description :this.fb.control(null,[Validators.required, Validators.maxLength(500)]),
          startsAt :this.fb.control(null,[Validators.required]),
          endsAt :this.fb.control(null,[Validators.required]),
          supplierName :[this.supplierName] ,
          projectManagerName :this.fb.control(this.projectManagerName),
        }
      );
      console.log('Supplier ' + this.supplierName)
    }

  handleSaveProject() {
    let project:Project = this.newProjectFormGroup.value
   // project.projectManagerName=this.managersNames.at(0)!
    project.projectManagerName=this.projectManagerName
    project.projectManagerId
    project.supplierId = Number(this.supplierId)
    project.supplierName=this.supplierName
    project.userId = this.keycloakService.getKeycloakInstance()?.idTokenParsed?.sub||''
    if (project.supplierName=='' || project.projectManagerName==''  ) alert("supplier is missing or project manager is missing")
    else {
      this.projectService.saveProject(project).subscribe({
        next:(value)=>{alert("added")},
        error:(err)=>console.log("error")
      })
    }
  }

  resetStepper() {

  }

  toggleLinearMode() {

  }
}
