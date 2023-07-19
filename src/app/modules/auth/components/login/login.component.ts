import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';
import { User } from 'src/app/modules/users/models/user.model';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/login-credentials.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email?: string;
  public password?: string;
  public users!: User[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  public login(): void {
    const payload: LoginCredentials = {
      email: this.email!,
      password: this.password!,
    };

    this.authService
      .login(payload)
      .pipe(first())
      .subscribe({
        next: (response) => {
          const user: Partial<User> = {
            ...response.user,
            roles: ['VIEW'],
          };
          localStorage.setItem(GlobalConstants.USER, JSON.stringify(user));
          localStorage.setItem(GlobalConstants.USER_TOKEN, response.token);
        },
        error: (err) => {
          console.log(err);
          this.snackbarService.openSnackBar(err.error.message);
        },
        complete: () => {
          this.router.navigate(['/users']);
        },
      });
  }
}
