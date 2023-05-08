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
import { RigthSideBarComponent } from './components/rigth-side-bar/rigth-side-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatBadgeModule } from '@angular/material/badge';
import { SlidesComponent } from './components/slides/slides.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    ContentTableComponent,
    Nw3Component,
    SettingBoxComponent,
    RigthSideBarComponent,
    SlidesComponent,
    QrCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    NgxChartsModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatInputModule,
    BrowserAnimationsModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
