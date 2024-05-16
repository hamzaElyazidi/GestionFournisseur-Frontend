import {Component, Inject, Input, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EvaluationService} from "../services/evaluation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SupplierDetailsDialogComponent} from "../supplier-details-dialog/supplier-details-dialog.component";
import {SupplierService} from "../services/supplier.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {industrySector, Supplier} from "../model/supplier.model";
import {Project} from "../model/project.model";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Content, TDocumentDefinitions, UnorderedListElement} from "pdfmake/interfaces";
import {SuppliersComponent} from "../suppliers/suppliers.component";
import {ProjectsComponent} from "../projects/projects.component";


@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit{
  supplierId: string;
  //supplierId:string
  supplier! : Observable<Supplier>
  projects! : Observable<Array<Project>>
  errorMessage! : string
  constructor(private supplierService : SupplierService,private projectService : ProjectService , private router : Router , private route : ActivatedRoute , private evaluationService:EvaluationService )
   {
  this.supplierId = this.route.snapshot.params['supplierId'];
  //  this.supplierId = data.supplierId
  }

  ngOnInit(): void {
      this.supplier = this.supplierService.getSupplierByid(Number(this.supplierId)).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        }))
    this.projects = this.projectService.getProjectsOfGivenSupplier(Number(this.supplierId)).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);}),
    map(array => array.slice().sort((a, b) => {
      if (a.evaluation_score > b.evaluation_score) return -1;
      else if (a.evaluation_score < b.evaluation_score) return 1;
      else return 0;
    }))
    );
    }

  generateSupplierPDF(): void {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    console.log("GERE")
    type Content = {
      text: string;
      style: string;
    } | {
      ul: Content[];
      style: string;
    };
    this.supplierService.getSupplierByid(Number(this.supplierId)).subscribe(
      {
        next:value => {
          this.projectService.getProjectsOfGivenSupplier(Number(this.supplierId)).subscribe(
            {
              next:value1 => {
                const content = this.generateContent(value,value1)
                const documentDefinition: TDocumentDefinitions = {
                  content: content,
                  styles: {
                    heading: { fontSize: 16, bold: true },
                    subHeading: { fontSize: 14, bold: true },
                    paragraph: { fontSize: 12 },
                    list: { fontSize: 12 }
                  }
                };
                pdfMake.createPdf(documentDefinition).download();
              }
            }
          )
        }
      }
    )





    // //const content = this.generateContent()
    // const documentDefinition: TDocumentDefinitions = {
    //   content: content,
    //   styles: {
    //     heading: { fontSize: 16, bold: true },
    //     subHeading: { fontSize: 14, bold: true },
    //     paragraph: { fontSize: 12 },
    //     list: { fontSize: 12 }
    //   }
    // };
    // // Generate PDF
    // pdfMake.createPdf(documentDefinition).download();
  }
  handleGenerateRaport()
  {

    this.generateSupplierPDF()
  }
   generateContent(supplier: Supplier, projects: Project[]): Content[] {
    const content: Content[] = [];
    content.push(
      { text: `Supplier Name: ${supplier.name}`, style: 'heading' },
      { text: `Description: ${supplier.description}`, style: 'paragraph' },
      { text: `Rating: ${supplier.rating}`, style: 'paragraph' },
      { text: 'Projects:', style: 'subHeading' }
    );
    projects.forEach(project => {
      content.push(
        { text: `${project.n_contract}:`, style: 'subHeading' },
        { text: `Description: ${project.description}`, style: 'paragraph' },
        { text: `Contract Number: ${project.n_contract}`, style: 'subSubHeading' },
        { text: `Project Manager: ${project.projectManagerName}`, style: 'subSubHeading' },
        { text: `Start Date: ${project.startsAt}`, style: 'subSubHeading' },
        { text: `End Date: ${project.endsAt}`, style: 'subSubHeading' },
        { text: `Evaluation Score: ${project.evaluation_score}`, style: 'subSubHeading' },
      );
    });

    return content;
  }
  convertEnum(sector: industrySector|undefined) {
    if (sector?.toString()==="")return ""
    if (sector?.toString()==='Sector1') return 'Industrie manufacturière'
    if (sector?.toString()==='Sector2') return 'Technologie de l\'information (TI)'
    if (sector?.toString()==='Sector3') return 'Services professionnels'
    if (sector?.toString()==='Sector4') return 'Commerce de détail'
    if (sector?.toString()==='Sector5') return 'Services financiers'
    if (sector?.toString()==='Sector6') return 'Secteur de la santé'
    if (sector?.toString()==='Sector7') return 'Transport et logistique'
    if (sector?.toString()==='Sector8') return 'Construction et immobilier'
    if (sector?.toString()==='Sector9') return 'Alimentation et agriculture'
    if (sector?.toString()==='Sector10') return 'Alimentation et agriculture'
    return ""
  }


  handleGetDetailsOfProject(p: Project) {
    this.router.navigateByUrl("/project-details/"+p.id)

  }
}
