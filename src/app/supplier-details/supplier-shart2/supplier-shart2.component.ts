import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {Project} from "../../model/project.model";
import {SupplierService} from "../../services/supplier.service";
import {ProjectService} from "../../services/project.service";
import {of} from "rxjs";
import {Evaluation} from "../../model/evaluation.model";

@Component({
  selector: 'app-supplier-shart2',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule,
    NgIf
  ],
  templateUrl: './supplier-shart2.component.html',
  styleUrl: './supplier-shart2.component.css'
})
export class SupplierShart2Component implements OnInit{
  @Input() supplierId! : string ;
  projects!:Project[]
  projectsLoaded: boolean = false;
  evaluations!: Evaluation[]
  evaluationLoaded: boolean = false;
  constructor(private supplierService : SupplierService , private projectService : ProjectService) {
  }
  async ngOnInit(){
    await this.loadEvaluations() ;
    //console.log(this.evaluations)
    let constructedDataPoints = await this.constructDataPoints() ;
    this.updateChartData(constructedDataPoints)
  }


  updateChartData(newDataPoints: { label: string, y: number }[]) {
    this.chartOptions.data[0].dataPoints = newDataPoints;
  }
 async constructDataPoints()
  {
    let axe1 = {'id' : 1 , 'sum' : 0  }
    let axe2 = {'id' : 2 , 'sum' : 0  }
    let axe3 = {'id' : 3 , 'sum' : 0 }
    let axe4 = {'id' : 4 , 'sum' : 0  }
    let axe5 = {'id' : 5 , 'sum' : 0  }

    let count = 0
    for (const evaluation of this.evaluations) {
      count ++
      for (const score  of evaluation.scores!) {
        if (score.question_id == 1 ) axe1.sum = axe1.sum + score.score
        if (score.question_id == 2 ) axe2.sum = axe2.sum + score.score
        if (score.question_id == 3 ) axe3.sum = axe3.sum + score.score
        if (score.question_id == 4 ) axe4.sum = axe4.sum + score.score
        if (score.question_id == 5 ) axe5.sum = axe5.sum + score.score
      }
    }
    let constructedDataPoints: { label: string, y: number }[] = []

    constructedDataPoints.push({label:'Performance technique',y:axe1.sum/count})
    constructedDataPoints.push({label:'maitrise des couts',y:axe2.sum/count})
    constructedDataPoints.push({label:'respect des delais',y:axe3.sum/count})
    constructedDataPoints.push({label:'resolution des problemes',y:axe4.sum/count})
    constructedDataPoints.push({label:'hygiène securité environnement',y:axe5.sum/count})
    return constructedDataPoints

  }

  chartOptions = {
    title: {
      text: 'Average Scores Across Evaluation Axes',
    },
    theme: 'light2',
    animationEnabled: true,
    exportEnabled: true,
    axisY: {
      includeZero: true,
      valueFormatString: "#,##0 '%'",
    },
    data: [
      {
        type: 'column', //change type to bar, line, area, pie, etc
        yValueFormatString: "#,##0 '%'",
        color: '#01b8aa',
        dataPoints: [
          { label: 'Performance technique', y:  0},
          { label: 'maitrise des couts', y: 189 },
          { label: 'respect des delais', y: 201 },
          { label: 'resolution des problemes', y: 201 },
        ],
      },
    ],
  };
  async loadEvaluations() {
    return new Promise<void>((resolve, reject) => {
      this.projectService.getEvaluationsOfGivenSupplier(Number(this.supplierId)).subscribe(
        (evaluations: Evaluation[]) => {
          this.evaluations = evaluations;
          this.evaluationLoaded = true;
          resolve();
        },
        error => {
          console.error('Error fetching evaluations:', error);
          reject(error);
        }
      );
    });
  }
}
