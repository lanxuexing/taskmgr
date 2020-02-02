import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/share';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register.routing';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    ShareModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
