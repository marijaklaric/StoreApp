import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/users.model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }

 /*  openEditUser(userId: number){
    this.router.navigateByUrl("/users/" + userId);
  } */
}
