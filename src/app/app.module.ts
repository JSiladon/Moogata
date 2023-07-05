import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ReportComponent } from './report/report.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PanelModule} from 'primeng/panel';
import {SplitterModule} from 'primeng/splitter';
import {TableModule} from 'primeng/table';
import { Routes,RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

const appRoutes: Routes = [
  {path: '',component: IndexComponent},
  {path: 'report',component: ReportComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PanelModule,
    SplitterModule,
    TableModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
