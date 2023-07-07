import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from '../app-routing.module';
import { ZipCodeMaskPipe } from './pipes/zip-code-mask.pipe';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, ZipCodeMaskPipe],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [HeaderComponent, NotFoundComponent, ZipCodeMaskPipe],
})
export class SharedModule {}
