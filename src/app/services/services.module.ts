import { NgModule } from '@angular/core';
import { DragDropService } from './drag-drop.service';

const COMMON = [
  DragDropService,
];


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    ...COMMON
  ]
})
export class ServicesModule { }
