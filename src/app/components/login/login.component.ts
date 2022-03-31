import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFalse = false;
  errorMessage = '';
  roles: string[] = [];
  username?: string;
  message?: string = "Hello";

  constructor(private authService : AuthService, private tokenStorage : TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn= true;
      this.roles=this.tokenStorage.getUser().roles;
    }
  }
  onSubmit() : void {
    this.authService.login(this.form).subscribe( data => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);
      this.isLoginFalse = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
      window.location.reload();
    }, error => {
      this.errorMessage = error.error().getMessage() ;
      this.isLoginFalse = true;
    })
  }

}
