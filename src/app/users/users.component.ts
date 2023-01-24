import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../products/confirmation-dialog/confirmation-dialog.component';
import { User } from './models/users.model';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[];
  public loading: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
      this.loading = false;
  }

  openEditUser(userId: number){
    this.router.navigateByUrl("/users/" + userId);
  }

  deleteUser(user: User) {
    if (confirm("Are you sure you want to delete product " + user.name + "?"))
      this.usersService.deleteUser(user.id).subscribe(res => {
        this.router.navigateByUrl('/users');
        alert("User deleted successfully.");
      }
      )
  }

  openConfirmationDialog(user: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure you want to delete this item?'
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform the delete action
        this.usersService.deleteUser(user.id).subscribe(res => {
          alert("User deleted successfully.");
        }
        )
      }
    });
  }

  addNewUser(): void {
    this.router.navigateByUrl('/add-user');
  }
}
