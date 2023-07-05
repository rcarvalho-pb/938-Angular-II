import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './modules/auth/login/login.component';
import { UsersComponent } from './modules/users/users.component';
import { CreateUserComponent } from './modules/users/components/create-user/create-user.component';
import { ListComponent } from './modules/users/components/list/list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NgxMaskModule } from 'ngx-mask';

const material = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatDividerModule,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ListComponent,
    CreateUserComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    material,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
