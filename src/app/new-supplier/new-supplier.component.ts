import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupplierService} from "../services/supplier.service";
import {industrySector, Supplier} from "../model/supplier.model";
import {SuppliersComponent} from "../suppliers/suppliers.component";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent implements OnInit{
    industrySectorArray = Object.values(industrySector);
    newSupplierFormGroup! : FormGroup;
    constructor(private router : Router ,private toastr: ToastrService,private fb : FormBuilder , private supplierService:SupplierService) {}
    ngOnInit(): void {
      this.newSupplierFormGroup = this.fb.group(
        {
          name : this.fb.control(null ,[Validators.required, Validators.maxLength(50)]),
          description :this.fb.control(null,[Validators.required, Validators.maxLength(500)]),
          phone :this.fb.control(null,[Validators.required, Validators.maxLength(500)]),
          website :this.fb.control(null,[Validators.required, Validators.maxLength(500)]),
          mail :this.fb.control(null,[Validators.required, Validators.maxLength(500)]),
          sector: this.fb.control(null)
        }
      );
    }

  handleSaveSupplier() {
      let supplier : Supplier= this.newSupplierFormGroup.value
      supplier.rating=0;
      this.supplierService.saveSupplier(supplier).subscribe({
        next : value => {
          this.toastr.success('Supplier added successfully!', 'Success');
          console.log(value)
          this.router.navigateByUrl("/suppliers")
        },
        error : err => {console.log(err)}
      })
  }

  protected readonly industrySector = industrySector;
  convertEnum(sector:string) {
    if (sector.toString()==="")return ""
    if (sector.toString()==='Sector1') return 'Industrie manufacturière'
    if (sector.toString()==='Sector2') return 'Technologie de l\'information (TI)'
    if (sector.toString()==='Sector3') return 'Services professionnels'
    if (sector.toString()==='Sector4') return 'Commerce de détail'
    if (sector.toString()==='Sector5') return 'Services financiers'
    if (sector.toString()==='Sector6') return 'Secteur de la santé'
    if (sector.toString()==='Sector7') return 'Transport et logistique'
    if (sector.toString()==='Sector8') return 'Construction et immobilier'
    if (sector.toString()==='Sector9') return 'Alimentation et agriculture'
    if (sector.toString()==='Sector10') return 'Alimentation et agriculture'
    return ""
  }
}
