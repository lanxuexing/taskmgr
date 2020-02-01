import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';
import { ShareModule } from 'src/app/share';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ShareModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
