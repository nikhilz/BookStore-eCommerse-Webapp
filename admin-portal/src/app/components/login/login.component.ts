import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   credential = { 'username': '', 'password': '' }
   loggedIn: boolean = false;
  roles: string[] = [];

  constructor(private loginService: LoginService,
    private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.loggedIn = true;
      this.roles = this.tokenService.getUser().roles;
    }
  }

  onSubmit(){
    console.table('--------->'+this.credential);
    this.loginService.login(this.credential).subscribe(
    (data) => {
      console.log(data);
      this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveUser(data);
        this.roles = this.tokenService.getUser().roles;
        this.loggedIn = true;
        this.reloadPage();
    },
    (error) => {
      console.log(error)
      this.loggedIn = false;
    }
    )
  }
  reloadPage() {
    window.location.reload();
  }

}
