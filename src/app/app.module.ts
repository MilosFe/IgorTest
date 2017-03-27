import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routedComponents } from './app.routing.module';
import { AppComponent } from './app.component';
import {  CurencyComponent } from './curency/curency.component';
import { CurencyService } from './curency/curency.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemDataService} from './data.service';



@NgModule({
  declarations: [
    AppComponent,
    CurencyComponent,
    routedComponents,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    RouterModule,
    InMemoryWebApiModule.forRoot(InMemDataService)
  ],
  providers: [CurencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
