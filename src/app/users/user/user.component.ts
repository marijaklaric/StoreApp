import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userId: number;
  public user: User;
  public form: FormGroup;
  isLoaded: boolean = false;
  isEditMode: boolean = true;
  public loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.loading = true;
    this.isEditMode = true;
    this.getRouteParams();
  }

  getRouteParams() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userId = params['id'];
          if (this.userId != null) {
            this.getUser(this.userId);
          }
        }
      );
  }

  getUser(userId: number) {
    this.userService.getUser(userId)
      .subscribe(user => {
        this.user = user;
        this.isLoaded = true;
        if (this.isLoaded == true) {
          this.userForm();
          this.form.disable();
          this.loading = false;
        }
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
    this.userService.putUser(this.user.id, formValue.value).subscribe(user => this.user = user);
  }

}
