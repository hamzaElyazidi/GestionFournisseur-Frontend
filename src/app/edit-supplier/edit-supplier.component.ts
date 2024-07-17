import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierService} from "../services/supplier.service";
import {industrySector, Supplier} from "../model/supplier.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit{
  supplierId! : string
  supplier!:Supplier
  EditSupplierFormGroup! :FormGroup
  industrySectorArray = Object.values(industrySector);

  constructor(private router : Router ,private toastr: ToastrService,private fb:FormBuilder,private route : ActivatedRoute , private supplierService :SupplierService) {
   this.supplierId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {

    this.supplierService.getSupplierByid(Number(this.supplierId)).subscribe({
      next:(supplier)=>{
        this.supplier=supplier
        this.EditSupplierFormGroup = this.fb.group(
          {
            nom : this.fb.control(this.supplier.name ,[Validators.required, Validators.maxLength(50)]),
            description :this.fb.control(this.supplier.description,[Validators.required, Validators.maxLength(500)]),
            phone :this.fb.control(this.supplier.phone,[Validators.required, Validators.maxLength(500)]),
            website :this.fb.control(this.supplier.website,[Validators.required, Validators.maxLength(500)]),
            mail :this.fb.control(this.supplier.mail,[Validators.required, Validators.maxLength(500)]),
            sector: this.fb.control(this.supplier.sector)
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
      next: supplier=>{
        this.toastr.success('Supplier updated successfully!', 'Success');
        this.router.navigateByUrl("/suppliers")
      },
      error: err =>{console.log(err)}
    })


  }


  protected readonly FormGroup = FormGroup;
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
    if (sector.toString()==='Sector10') return 'Energie'
    return ""
  }}
