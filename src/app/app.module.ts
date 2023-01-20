import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstatiscasComponent } from './grafico/estatiscas/estatiscas.component';
import { HttpClientModule } from '@angular/common/http';
import { DerivClientService } from './services/DerivService';
// import { DerivClientService } from './services/DerivService';
@NgModule({
  declarations: [
    AppComponent,
    EstatiscasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DerivClientService],
  bootstrap: [AppComponent],
})
export class AppModule { }
