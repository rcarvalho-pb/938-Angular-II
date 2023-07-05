import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public users!: User[];

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('USERS') || '[]');
  }
}
