import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/modules/users/models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  public email?: string;
  public password?: string;
  public users!: User[];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('USERS') || '[]');

    const observable = this.authService.generateObservable();

    observable
      .pipe(
        // first()
        // take(2)
        takeUntil(this.ngUnsubscribe)
        // map((res) => {
        //   return {
        //     ...res,
        //     lastname: 'Sobrenome',
        //   };
        // })
      )
      .subscribe({
        next(value) {
          console.log(value);
        },
        error(err) {
          console.log(err);
        },
        complete() {
          console.log('Completo!');
        },
      });
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
