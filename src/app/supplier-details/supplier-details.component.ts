import {Component, Inject, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EvaluationService} from "../services/evaluation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SupplierDetailsDialogComponent} from "../supplier-details-dialog/supplier-details-dialog.component";

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit{
  supplierId:string
  constructor(private projectService : ProjectService , private router : Router , private route : ActivatedRoute , private evaluationService:EvaluationService,
              public dialogRef: MatDialogRef<SupplierDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { supplierId: string }
  )   {
   // this.supplierId = this.route.snapshot.params['supplierId'];
    this.supplierId = data.supplierId
  }

  ngOnInit(): void {
    }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
