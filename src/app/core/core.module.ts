import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { SidebarComponent } from './sidebar';
import { ShareModule } from '../share';

const COMMON = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent
];


@NgModule({
  declarations: [
    ...COMMON
  ],
  imports: [
    ShareModule
  ],
  exports: [
    ...COMMON,
    ShareModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('模块已经存在，不能再次创建～');
    }
  }
}
