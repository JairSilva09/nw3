import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentTableComponent } from './components/content-table/content-table.component';
import { Nw3Component } from 'src/app/nw3/nw3.component';
import {  HttpClientModule } from '@angular/common/http';
import { SettingBoxComponent } from './components/setting-box/setting-box.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    ContentTableComponent,
    Nw3Component,
    SettingBoxComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
