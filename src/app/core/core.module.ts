import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ShareModule } from '../share';
import { loadSvgResources } from '../utils';
import { FooterComponent } from './footer';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';

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
    ShareModule,
    HttpClientModule
  ],
  exports: [
    ...COMMON,
    ShareModule
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('模块已经存在，不能再次创建～');
    }
    loadSvgResources(ir, ds);
  }
}
