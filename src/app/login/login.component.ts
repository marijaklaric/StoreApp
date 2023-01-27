import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from './models/credentials.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public credentials: Credentials;
  public form: FormGroup;
  public loading: boolean = false;
  public token: string;
  public errorMessage: string;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.loginForm();
    this.loading = false;
  }

  loginForm() {
    this.form = new FormGroup({
      username: new FormControl(this.credentials?.username),
      password: new FormControl(this.credentials?.password)
    });
  }


  onSubmit(formValue: FormGroup) {
    this.loginService.login(formValue.value.username, formValue.value.password)
      .subscribe(res => {
        this.token = res;
      },
        (err) => {
          // handle error
          this.errorMessage = err
          console.log(err);
        });
  }
}
