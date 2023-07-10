import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email?: string;
  public password?: string;
  public users!: User[];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('USERS') || '[]');
  }

  public login(): void {
    const result = this.authService.login({
      email: this.email,
      password: this.password,
    });

    console.log(typeof result);

    if (typeof result === 'string') {
      return;
    }

    console.log(result);

    this.router.navigate(['/users']);
  }
}
