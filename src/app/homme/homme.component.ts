import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../services/security.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ProjectService} from "../services/project.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-homme',
  standalone: true,
  imports: [],
  templateUrl: './homme.component.html',
  styleUrl: './homme.component.css'
})
export class HommeComponent implements OnInit{
  constructor(public secService: SecurityService,private router : Router,private keycloakService: KeycloakService)   {

  }
  ngOnInit(): void {

      setTimeout(() => {
        if (this.keycloakService.getKeycloakInstance().hasRealmRole('ADMIN'))
          this.router.navigate(["/users"])
          // this.router.navigate(["/home"])
        else
          this.router.navigate(["/my-projects"])
          // this.router.navigate(["/home"])
      }, 500);
  }
}
