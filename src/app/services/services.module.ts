import { NgModule, ModuleWithProviders } from '@angular/core';
import { DragDropService } from './drag-drop.service';

const COMMON = [
  DragDropService,
];


@NgModule({
  providers: [
    ...COMMON
  ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule
    };
  }
}
