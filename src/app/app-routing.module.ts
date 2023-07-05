import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { CreateUserComponent } from './modules/users/components/create-user/create-user.component';
import { ListComponent } from './modules/users/components/list/list.component';
import { UsersComponent } from './modules/users/users.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'create',
        component: CreateUserComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
