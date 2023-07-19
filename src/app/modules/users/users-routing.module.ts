import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { authGuard } from 'src/app/core/guards/functional-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [authGuard],
    data: {
      roles: ['VIEW'],
    },
  },
  {
    path: 'create',
    component: CreateUserComponent,
  },
  {
    path: 'edit/:id',
    component: CreateUserComponent,
    canActivate: [authGuard],
    data: {
      roles: ['EDIT'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
