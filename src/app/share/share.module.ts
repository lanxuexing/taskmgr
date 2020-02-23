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
  MatSnackBarModule,
  MatChipsModule,
  MatTabsModule
} from '@angular/material';
import { DirectivesModule } from '../directives';
import { ImageSelectComponent } from './image-select';
import { AgeCalcComponent } from './age-calc';
import { ToastComponent } from './toast';
import { ChipsListComponent } from './chips-list';
import { AddressSelectComponent } from './address-select';
import { IdentityInputComponent } from './identity-input';
import { CounterComponent } from './counter';

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
  MatChipsModule,
  MatTabsModule,
  DirectivesModule,
];

const COMMON = [
  ConfirmDialogComponent,
  ImageSelectComponent,
  AgeCalcComponent,
  ToastComponent,
  ChipsListComponent,
  AddressSelectComponent,
  IdentityInputComponent,
  CounterComponent,
];

const ENTRY = [
  ConfirmDialogComponent,
  ToastComponent,
  ChipsListComponent,
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
