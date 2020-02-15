import { NgModule } from '@angular/core';
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
  exports: [
    ...COMON
  ]
})
export class DirectivesModule { }
