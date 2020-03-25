import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

   loggedIn:boolean = false;

  constructor() { }

  toggleDisplay(){
    this.loggedIn = !this.loggedIn ;
  }
  ngOnInit(): void {
  }

}
