import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EvaluationService} from "../services/evaluation.service";

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit{
  supplierId:string
  constructor(private projectService : ProjectService , private router : Router , private route : ActivatedRoute , private evaluationService:EvaluationService)   {
    this.supplierId = this.route.snapshot.params['supplierId'];
  }

  ngOnInit(): void {
    }

}
