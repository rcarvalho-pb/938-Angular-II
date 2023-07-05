import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email?: string;
  public password?: string;
  public users!: User[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('USERS') || '[]');
  }

  public login(): void {
    const user = this.users.find(
      (u) => u.email === this.email && u.password === this.password
    );

    if (!user) {
      return console.log('Falha ao logar!');
    }

    console.log('Usuário autenticado', user);
    localStorage.setItem('USER', JSON.stringify(user));

    this.router.navigate(['/users']);
  }
}
