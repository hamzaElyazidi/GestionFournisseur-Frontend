import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SupplierService} from "../services/supplier.service";
import {Supplier} from "../model/supplier.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit{
  supplierId! : string
  supplier!:Supplier
  EditSupplierFormGroup! :FormGroup
  constructor(private fb:FormBuilder,private route : ActivatedRoute , private supplierService :SupplierService) {
   this.supplierId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {

    this.supplierService.getSupplierByid(Number(this.supplierId)).subscribe({
      next:(supplier)=>{
        this.supplier=supplier
        this.EditSupplierFormGroup = this.fb.group(
          {
            name : this.fb.control(this.supplier.name ,[Validators.required, Validators.maxLength(50)]),
            description :this.fb.control(this.supplier.description,[Validators.required, Validators.maxLength(500)]),
          }
        );

      },
      error:(err)=>{
        console.log(err)
      }
    })

    }

  handleUpdateSupplier() {
    let supplier = this.EditSupplierFormGroup.value
    supplier.id=this.supplier.id
    supplier.rating=this.supplier.rating
     this.supplierService.updateSupplier(supplier).subscribe({
      next: supplier=>{alert("updated")},
      error: err =>{console.log(err)}
    })


  }


  protected readonly FormGroup = FormGroup;
}
