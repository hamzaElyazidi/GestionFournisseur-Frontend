import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupplierService} from "../services/supplier.service";
import {Supplier} from "../model/supplier.model";

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent implements OnInit{
    newSupplierFormGroup! : FormGroup;
    constructor(private fb : FormBuilder , private supplierService:SupplierService) {}
    ngOnInit(): void {
      this.newSupplierFormGroup = this.fb.group(
        {
          name : this.fb.control(null ,[Validators.required, Validators.maxLength(50)]),
          description :this.fb.control(null,[Validators.required, Validators.maxLength(500)]),
        }
      );
    }

  handleSaveSupplier() {
      let supplier : Supplier= this.newSupplierFormGroup.value
      supplier.rating=0;
      this.supplierService.saveSupplier(supplier).subscribe({
        next : value => {alert("added")},
        error : err => {console.log(err)}
      })
  }
}
