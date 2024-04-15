import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupplierService} from "../services/supplier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagerService} from "../services/manager.service";
import {async} from "rxjs";
import {Project} from "../model/project.model";
import {ProjectService} from "../services/project.service";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit{
  newProjectFormGroup! : FormGroup;
  supplierId! : string
  supplierName:string=""
  managersNames:string[]=[]

  constructor(private fb : FormBuilder , private supplierService:SupplierService,private managerService:ManagerService, private router : Router , private route : ActivatedRoute , private projectService:ProjectService) {
    this.supplierId = this.route.snapshot.params['supplierId'];
    managerService.getAllManagers().subscribe({
      next:(value)=>{
       this.managersNames=  value.map((manager)=>manager.first_name+' '+manager.last_name)
      },
      error:(err)=>{}
    })
    supplierService.getSupplierByid(Number(this.supplierId)).subscribe(
      {
        next:value => {
          this.supplierName=value.name
          console.log(this.supplierName)
        },
        error:err => {console.log(err)}
      }
    )
  }
    ngOnInit(): void {
      this.newProjectFormGroup = this.fb.group(
        {
          n_contract : this.fb.control(null ,[Validators.required, Validators.maxLength(50)]),
          description :this.fb.control(null,[Validators.required, Validators.maxLength(500)]),
          startsAt :this.fb.control(null,[Validators.required]),
          endsAt :this.fb.control(null,[Validators.required]),
          supplierName :this.fb.control(this.supplierName),
        }
      );
    }

  handleSaveProject() {
    let project:Project = this.newProjectFormGroup.value
    project.projectManagerName=this.managersNames.at(0)!
    project.supplierName=this.supplierName
    this.projectService.saveProject(project).subscribe({
      next:(value)=>{alert("added")},
      error:(err)=>console.log("error")
    })

  }
}
