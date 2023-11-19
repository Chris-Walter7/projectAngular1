import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {InplaceModule} from "primeng/inplace";
import {AuthService} from "./services/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
// @ts-ignore
//import { RestComponent } from "./services/ticket-rest"
// @ts-ignore
import { TicketsComponent } from './services/tickets/tickets.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {ConfigService} from "./services/config.service";

function initializeApp(config: ConfigService) {
  return() => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}


let RestInterceptorsService;

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    //TicketsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InplaceModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    // {useClass: RestInterceptorsService, provide: HTTP_INTERCEPTORS, multi: true},
    ConfigService,
    {provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [ConfigService]}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
