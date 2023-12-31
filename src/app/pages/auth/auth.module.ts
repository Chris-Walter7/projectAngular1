import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { TabViewModule } from 'primeng/tabview';
import { AuthComponent } from './auth.component'
import { InputTextModule} from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import {MyComponentComponent} from "../../my-component/my-component.component";
import {InplaceModule} from "primeng/inplace";
import { CheckboxModule } from 'primeng/checkbox';
import { RegistrationComponent } from './registration/registration.component';
import { ToastModule } from 'primeng/toast';
import {MessageService} from "primeng/api";
import {TicketsComponent} from "../tickets.component";


@NgModule({
  declarations: [
    AuthorizationComponent,
    AuthComponent,
    MyComponentComponent,
    RegistrationComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    InplaceModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class AuthModule { }
