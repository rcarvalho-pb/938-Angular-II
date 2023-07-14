import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/users/models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public users!: User[];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public onDelete(id: string): void {
    this.usersService.delete(id);
    this.getUsers();
  }

  public getUsers(): void {
    this.users = this.usersService.findAll();
  }
}
