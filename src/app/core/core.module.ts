import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ShareModule } from '../share';
import { loadSvgResources } from '../utils';
import { FooterComponent } from './footer';
import { HeaderComponent } from './header';
import { SidebarComponent } from './sidebar';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const COMMON = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent
];

const MODULE = [
  BrowserAnimationsModule,
  RouterModule,
  ShareModule,
];


@NgModule({
  declarations: [
    ...COMMON
  ],
  imports: [
    ...MODULE,
    HttpClientModule
  ],
  exports: [
    ...COMMON,
    ...MODULE,
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
