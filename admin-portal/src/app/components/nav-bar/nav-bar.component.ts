import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

   loggedIn:boolean = false;

  constructor(private tokenStorage: TokenStorageService,
    private router:Router) { }

 
  ngOnInit(): void {
    this.loggedIn = !!this.tokenStorage.getToken();
  }

  logout() {
    this.tokenStorage.signout();
    this.loggedIn = false;
    this.router.navigate(["/login"]);
    
  }

}
