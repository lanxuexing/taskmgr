import { NgModule } from '@angular/core';
import { ServicesModule } from '../services';
import { DragDirective } from './drag.directive';
import { DropDirective } from './drop.directive';

const COMON = [
  DragDirective,
  DropDirective,
];


@NgModule({
  declarations: [
    ...COMON
  ],
  imports: [
    ServicesModule
  ],
  exports: [
    ...COMON
  ]
})
export class DirectivesModule { }
