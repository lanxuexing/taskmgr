import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatSnackBarModule
} from '@angular/material';
import { DirectivesModule } from '../directives';
import { ImageSelectComponent } from './image-select';
import { AgeCalcComponent } from './age-calc';
import { ToastComponent } from './toast';

const MODULE = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatSnackBarModule,
  DirectivesModule,
];

const COMMON = [
  ConfirmDialogComponent,
  ImageSelectComponent,
  AgeCalcComponent,
  ToastComponent,
];

const ENTRY = [
  ConfirmDialogComponent,
  ToastComponent,
];


@NgModule({
  declarations: [
    ...COMMON
  ],
  imports: [
    ...MODULE
  ],
  exports: [
    ...MODULE,
    ...COMMON
  ],
  entryComponents: [
    ...ENTRY
  ]
})
export class ShareModule { }
