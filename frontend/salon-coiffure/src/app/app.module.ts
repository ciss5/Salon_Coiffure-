import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';

import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import { FullCalendarModule} from '@fullcalendar/angular';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    provideHttpClient() // Remplace HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
