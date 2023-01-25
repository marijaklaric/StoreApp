import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FakeStoreAPI';
  isUserLogged = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.loggedIn.subscribe(isLoggedIn => {
      this.isUserLogged = isLoggedIn;
      if(!isLoggedIn){
        this.router.navigateByUrl("/login")
      }
      else{
        this.router.navigateByUrl("/");
      }
    });

    if(localStorage.getItem("token")){
      this.isUserLogged = true;
    }
    else{
      this.isUserLogged = false;
      this.router.navigateByUrl("/login");
    }
  }
}
