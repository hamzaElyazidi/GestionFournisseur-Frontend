import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../services/security.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
   constructor(public secService : SecurityService,public keycloak:KeycloakService) {
   }
    ngOnInit(): void {
    }


  logout() {
    console.log()
    this.secService.kcService.logout(window.location.origin+"/");
  }
}
