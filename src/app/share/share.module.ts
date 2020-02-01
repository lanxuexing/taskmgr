import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule
} from '@angular/material';

const COMMON = [
  CommonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
];


@NgModule({
  declarations: [],
  imports: [
    ...COMMON
  ],
  exports: [
    ...COMMON
  ]
})
export class ShareModule { }
