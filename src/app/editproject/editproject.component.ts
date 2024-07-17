import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {Supplier} from "../model/supplier.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SupplierService} from "../services/supplier.service";
import {ProjectService} from "../services/project.service";
import {Project} from "../model/project.model";
import {ManagerService} from "../services/manager.service";
import {Observable} from "rxjs";
import {Manager} from "../model/manager.model";
import { forkJoin } from 'rxjs';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-editproject',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './editproject.component.html',
  styleUrl: './editproject.component.css'
})
export class EditprojectComponent  implements OnInit{
  projectId! : string
  project!:Project
  EditProjectFormGroup! :FormGroup
  supplierName:string=""
  projectManagerName:string=""
  buyerName : string=""
  allManagers! : Observable<Array<Manager>>
  allSuppliers! : Observable<Array<Supplier>>
  currentSupplier! : Supplier
  currentManager! : Manager
  isEvaluated : boolean = false

  constructor(private keycloakService : KeycloakService,private managerService : ManagerService ,private projectService : ProjectService ,private router : Router ,private toastr: ToastrService,private fb:FormBuilder,private route : ActivatedRoute , private supplierService :SupplierService) {
    this.projectId = this.route.snapshot.params['id'];
  }
     ngOnInit(): void{
      this.allManagers = this.managerService.getAllManagers()
      this.allSuppliers = this.supplierService.getSuppliers()


// In your component method
       this.projectService.getProjectByid(Number(this.projectId)).subscribe({
         next: (project) => {
           this.project = project;
           // if (project.evaluationId!==undefined)
           //   this.isEvaluated = true
           console.log(project);

           // Use forkJoin to wait for both observables to complete
           forkJoin({
             supplier: this.supplierService.getSupplierByid(project.supplierId),
             manager: this.managerService.getMangerByid(project.projectManagerId)
           }).subscribe({
             next: ({ supplier, manager }) => {
               this.currentSupplier = supplier;
               this.currentManager = manager;
               // Initialize form with fetched data
               this.EditProjectFormGroup = this.fb.group({
                 n_contract: this.fb.control(project.n_contract, [Validators.required, Validators.maxLength(50)]),
                 description: this.fb.control(project.description, [Validators.required, Validators.maxLength(500)]),
                 startsAt: this.fb.control(new Date(project.startsAt).toISOString().substring(0, 10), [Validators.required]),
                 endsAt: this.fb.control(new Date(project.endsAt).toISOString().substring(0, 10), [Validators.required]),
                 amount: this.fb.control(project.amount, [Validators.required]),
                 supplier: this.fb.control(supplier.id, [Validators.required]),
                 manager: this.fb.control(manager.id, [Validators.required]),
               }, { validator: this.dateRangeValidator('startsAt', 'endsAt') });
             },
             error: (err) => {
               console.log(err);
             }
           });
         },
         error: (err) => {
           console.log(err);
         }
       });
    }
  dateRangeValidator(startKey: string, endKey: string): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      const start = group.get(startKey)?.value;
      const end = group.get(endKey)?.value;

      if (start && end && start >= end) {
        return { dateRange: 'startsAt must be less than endsAt' };
      }
      return null;
    };
  }

  protected readonly Date = Date;

  handleUpdateProject() {
    let project  : Project = this.EditProjectFormGroup.value
    project.id=this.project.id
    console.log(this.EditProjectFormGroup.value['supplier'])
    project.projectManagerId = this.EditProjectFormGroup.value['manager']
    project.buyerId
    project.supplierId = this.EditProjectFormGroup.value['supplier']

    project.userId = this.keycloakService.getKeycloakInstance()?.idTokenParsed?.sub||''

    this.projectService.updateProject(project).subscribe({
      next: project=>{
        this.toastr.success('Project updated successfully!', 'Success');
        this.router.navigateByUrl("/project-details/"+project.id)
      },
      error: err =>{console.log(err)}
    })
  }
}

