import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';

const COMMON = [
  CommonModule,
  MatSidenavModule,
  MatToolbarModule,
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
