import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/users/models/user.model';
import { UsersService } from '../../services/users.service';
import { first } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public users!: User[];

  constructor(
    private usersService: UsersService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public onDelete(id: string): void {
    this.usersService
      .delete(id)
      .pipe(first())
      .subscribe({
        error: (err) => {
          this.snackbarService.openSnackBar(err.error.message);
        },
        complete: () => {
          this.getUsers();
        },
      });
  }

  public getUsers(): void {
    this.usersService
      .findAll()
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (err) => {
          this.snackbarService.openSnackBar(err.error.message);
        },
      });
  }
}
