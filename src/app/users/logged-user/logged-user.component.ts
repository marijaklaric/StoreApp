import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.scss']
})
export class LoggedUserComponent implements OnInit {
  public users: User[];
  public user: User;
  public form: FormGroup;
  public loading: boolean = false;
  isLoaded: boolean = false;
  public decodedToken: any;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.decodedToken = jwt_decode(localStorage.getItem("token"));
  }

  ngOnInit(): void {
    this.loading = true;
    this.getUsers(this.decodedToken.user);
  }

  getUsers(loggedUserUsername) {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.user = users.find(x => x.username == loggedUserUsername);
        this.isLoaded = true;
        if (this.isLoaded == true) {
          this.userForm();
          this.form.disable();
        }
        this.loading = false;
      });
  }

  
  userForm() {
    this.form = new FormGroup({
      id: new FormControl(this.user.id),
      firstname: new FormControl(this.user.name.firstname),
      lastname: new FormControl(this.user.name.lastname),
      phone: new FormControl(this.user.phone),
      email: new FormControl(this.user.email),
      username: new FormControl(this.user.username),
      password: new FormControl(this.user.password),
      lat: new FormControl(this.user.address.geolocation.lat),
      long: new FormControl(this.user.address.geolocation.long),
      street: new FormControl(this.user.address.street),
      city: new FormControl(this.user.address.city),
      number: new FormControl(this.user.address.number),
      zipcode: new FormControl(this.user.address.zipcode),
    });
  }

  onBack(): void {
    this.router.navigateByUrl('/users');
  }

  toggleEditMode() {
    if (this.form.disabled) {
      this.form.enable();
    }
    else if (this.form.enabled) {
      this.form.disable();
    }
  }

  onSubmit(formValue: FormGroup) {
    this.usersService.putUser(this.user.id, formValue.value).subscribe(user => this.user = user);
  }
}
