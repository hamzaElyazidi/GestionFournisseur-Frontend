import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../services/security.service";
import {KeycloakService} from "keycloak-angular";
import {ProjectEvent, WebsocketService} from "../services/websocket.service";
import {Observable, Subscription} from "rxjs";
import {ManagerService} from "../services/manager.service";
import {SupplierService} from "../services/supplier.service";
import {Manager} from "../model/manager.model";
import {Supplier} from "../model/supplier.model";
import {ProjectService} from "../services/project.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  private userId:string=''
  private subscription: Subscription | undefined;
  allManagers! : Observable<Array<Manager>>
  allSuppliers! : Observable<Array<Supplier>>

  notifications:ProjectEvent[] = [

  ];
  constructor(private toastr: ToastrService,private projectService : ProjectService,private supplierService:SupplierService,private keycloakService: KeycloakService,private managerService  : ManagerService,private websocketService : WebsocketService ,public secService : SecurityService,public keycloak:KeycloakService) {
  }
    async ngOnInit(): Promise<void> {

      await this.waitForProfile();

      this.userId = this.keycloakService.getKeycloakInstance()?.idTokenParsed?.sub??'';
      this.fetchNotifications(this.userId)
      this.managerService.getManagerByUserId(this.userId).subscribe({
        next:(value1)=> {
          this.subscription = this.websocketService.connect(value1.id ?? 0).subscribe((event) => {
            this.toastr.success('A Project was Added check your notifications', 'Success');
            this.fetchNotifications(this.userId)
          });
        }})
    }


  logout() {
    console.log()
    this.secService.kcService.logout(window.location.origin+"/");
  }
  fetchNotifications(userId: string) {
    this.notifications=[]
    this.managerService.getManagerByUserId(userId).subscribe({
      next: (manager) => {
        this.projectService.getProjectEventsByManagerId(manager.id ?? 0).subscribe({
          next: (projectEvents) => {
            projectEvents.forEach(event => {
              if (!this.notifications.some(notification => this.isSameNotification(notification, event))) {
                this.notifications.push(event);
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('Error fetching manager by user ID', err);
      }
    });
  }

  isSameNotification(notification: any, event: any): boolean {
    return notification.n_contract === event.n_contract &&
      notification.buyerName === event.buyerName &&
      notification.projectId === event.projectId;
  }

  private async waitForProfile(): Promise<void> {
    while (!this.keycloakService.getKeycloakInstance()?.idTokenParsed?.sub) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  // private performActionWithUserId() {
  //   // Your logic that requires userId
  //   console.log('User ID is now available:', this.userId);
  // }
  deleteProjectEvent(id: number) {
    this.projectService.deleteProjectEvent(id).subscribe({
      next:value => this.fetchNotifications(this.userId)
    })
    this.notifications=[]
    this.fetchNotifications(this.userId)
  }
}
