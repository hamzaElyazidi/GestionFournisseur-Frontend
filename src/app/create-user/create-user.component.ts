import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Manager} from "../model/manager.model";
import {ManagerService} from "../services/manager.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Buyer} from "../model/buyer.model";
@Component({
  selector: 'app-create-user',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgForOf,
        AsyncPipe
    ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUSerComponent implements OnInit{
  newUserFormGroup! : FormGroup;

  constructor(private router : Router ,private toastr: ToastrService,private fb : FormBuilder , private managerService :ManagerService) {
  }

  ngOnInit(): void {
this.newUserFormGroup = this.fb.group({
  username : this.fb.control(null) ,
  password : this.fb.control(null),
  first_name : this.fb.control(null),
  last_name :this.fb.control(null),
  job_title : this.fb.control(null),
    mail :this.fb.control(null),
  role : this.fb.control(null)
})
    }
    handleCreateUser()
    {
      const formValues = this.newUserFormGroup.value
      if (formValues['role'] === 'Chef de Projet')
      {
        let manager: Manager = {
          first_name : formValues['first_name'],
          last_name : formValues['last_name'] ,
          job_title : formValues['job_title'] ,
          email : formValues['mail'] ,
          username : formValues['username'] ,
          password : formValues['password'] ,
        }
        this.managerService.createManger(manager).subscribe({
          next:value =>
          {
            this.toastr.success('Project Manager added successfully!', 'Success');
            console.log(value)
            this.router.navigateByUrl("/users")
          },
          error:err => {
            if (err.status === 400) {
              this.toastr.error('Username or email belongs to an existing user', 'Success');
            }
            console.log(err)
          }
        })
      }
      else if (formValues['role'] === 'Acheteur')
      {
        let buyer: Buyer = {
          first_name : formValues['first_name'],
          last_name : formValues['last_name'] ,
          job_title : formValues['job_title'] ,
          email :     formValues['mail'] ,
          username : formValues['username'] ,
          password : formValues['password'] ,
        }
        this.managerService.createBuyer(buyer).subscribe({
          next:value =>
          {
            this.toastr.success('Buyer added successfully!', 'Success');
            console.log(value)
            this.router.navigateByUrl("/users")
          },
          error:err => {
            // console.log("error")
            if (err.status === 400 ) {
              this.toastr.error("Username or email belongs to an existing user")
            }
          }
        })
      }
    }


    protected readonly Array = Array;
}
