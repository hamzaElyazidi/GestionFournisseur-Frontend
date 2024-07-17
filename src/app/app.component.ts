import {Component, OnInit} from '@angular/core';
import {ManagerService} from "./services/manager.service";
import {WebsocketService} from "./services/websocket.service";
import {Subscription} from "rxjs";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'evaluation-fournisseur-web';
  private subscription: Subscription | undefined;
  buyerName=""


  constructor(private keycloakService : KeycloakService ,private websocketService : WebsocketService,private managerService  : ManagerService) {


  }

  async ngOnInit() {
  }

}
