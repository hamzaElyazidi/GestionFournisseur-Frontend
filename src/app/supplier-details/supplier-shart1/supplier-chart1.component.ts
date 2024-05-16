import {Component, Input, OnInit} from '@angular/core';
import {SupplierService} from "../../services/supplier.service";
import {ProjectService} from "../../services/project.service";
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {RouterOutlet} from "@angular/router";
import {Project} from "../../model/project.model";

@Component({
  selector: 'app-supplier-shart1',
  templateUrl: './supplier-chart1.component.html',
  styleUrls: ['./supplier-chart1.component.css'],
  standalone:true,
  imports: [RouterOutlet, CommonModule, CanvasJSAngularChartsModule],
})
export class SupplierChart1Component implements OnInit{

   @Input() supplierId! : string ;
  projects!:Project[]
  projectsLoaded: boolean = false;

  constructor(private supplierService : SupplierService , private projectService : ProjectService) {
  }
  async ngOnInit(){
    await this.loadProjects();
     let constructedDataPoints: { x: Date, y: number }[] = []
     for (const project of this.projects) {
       let eval_date = new Date(project.startsAt) ;
       if (project.evaluation_score != null)
       constructedDataPoints.push({x:eval_date,y:project.evaluation_score})
     }
     this.updateChartData(constructedDataPoints)

  }
    updateChartData(newDataPoints: { x: Date, y: number }[]) {
    this.chartOptions.data[0].dataPoints = newDataPoints;
  }

  chart: any;

  chartOptions:any = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Rating over time"
    },
    axisY: {
      labelFormatter: (e: any) => {
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        return (e.value / Math.pow(1000, order)) + '%';
      },
      maximum:100
    },
    data: [{
      type: "line",
      xValueFormatString: "YYYY" ,
      yValueFormatString: "#,###.## '%'" ,
      dataPoints: [
      ]
    }]
}
  async loadProjects() {
    return new Promise<void>((resolve, reject) => {
      this.projectService.getProjectsOfGivenSupplier(Number(this.supplierId)).subscribe(
        (projects: Project[]) => {
          this.projects = projects;
          this.projects.sort((a, b) => {
            const dateA = new Date(a.startsAt);
            const dateB = new Date(b.startsAt);
            if (dateA < dateB) {
              return -1;
            }
            if (dateA > dateB) {
              return 1;
            }
            return 0;
          })
          this.projectsLoaded = true;
          resolve();
        },
        error => {
          console.error('Error fetching projects:', error);
          reject(error);
        }
      );
    });
  }
}



