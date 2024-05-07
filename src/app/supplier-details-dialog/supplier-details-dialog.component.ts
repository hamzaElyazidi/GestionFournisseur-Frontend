import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {SupplierChart1Component} from "../supplier-details/supplier-shart1/supplier-chart1.component";
import {SupplierShart2Component} from "../supplier-details/supplier-shart2/supplier-shart2.component";

@Component({
  selector: 'app-supplier-details-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    SupplierChart1Component,
    SupplierShart2Component,
    MatDialogActions
  ],
  templateUrl: './supplier-details-dialog.component.html',
  styleUrl: './supplier-details-dialog.component.css'
})
export class SupplierDetailsDialogComponent {

}
