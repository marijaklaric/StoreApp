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

  constructor(public loginService: LoginService) {
  }
}
