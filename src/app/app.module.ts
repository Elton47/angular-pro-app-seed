import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Store } from 'store';

// feature modules

// containers
import { AppComponent } from './containers/app/app.component';
import { AuthModule } from '../auth/auth.module';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}

// var config = {
//   apiKey: "AIzaSyBX_z7enOY_yYre2X4Z0tCbFtyKpcF7KqM",
//   authDomain: "fitness-app-47.firebaseapp.com",
//   databaseURL: "https://fitness-app-47.firebaseio.com",
//   projectId: "fitness-app-47",
//   storageBucket: "fitness-app-47.appspot.com",
//   messagingSenderId: "692842574156"
// };