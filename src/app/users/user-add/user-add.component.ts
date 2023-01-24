import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  public user: User;
  public form: FormGroup;
  isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.addNew();
  }

  addNew() {
    this.user = new User();
    this.isLoaded = true;
    if (this.isLoaded == true) {
      this.userForm();
      this.form.enable();
    }
  }

  userForm() {
    this.form = new FormGroup({
      id: new FormControl(this.user.id),
      firstname: new FormControl(this.user?.name?.firstname),
      lastname: new FormControl(this.user?.name?.lastname),
      phone: new FormControl(this.user.phone),
      email: new FormControl(this.user.email),
      username: new FormControl(this.user.username),
      password: new FormControl(this.user.password),
      lat: new FormControl(this.user.address?.geolocation?.lat),
      long: new FormControl(this.user.address?.geolocation?.long),
      street: new FormControl(this.user.address?.street),
      city: new FormControl(this.user.address?.city),
      number: new FormControl(this.user.address?.number),
      zipcode: new FormControl(this.user.address?.zipcode),
    });
  }

  onBack(): void {
    this.router.navigateByUrl('/users');
  }

  onSubmit(formValue: FormGroup) {
    this.userService.postUser(formValue.value).subscribe(user => this.user = user);
    console.log(this.user, "after save")
  }

}
