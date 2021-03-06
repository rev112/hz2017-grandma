import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
 } from '@angular/material';

import { DeviceService } from '../app/device.service';

import { HttpModule } from '@angular/http';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { MainComponent } from './main.component';

import { ArComponent } from './ar.component';

import { RouterModule, Routes } from '@angular/router';

import { Component } from '@angular/core';

const appRoutes: Routes = [
  { path: '', component: ArComponent },
  { path: 'list', component: AppComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ArComponent,
    MainComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,

    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [DeviceService],
  bootstrap: [MainComponent]
})
export class AppModule { }
