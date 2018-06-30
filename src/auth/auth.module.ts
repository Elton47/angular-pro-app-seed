import { NgModule } from '@angular/core';
import { CommonModule } from '../../node_modules/@angular/common';
import { RouterModule, Routes } from '../../node_modules/@angular/router';
import { AngularFireModule, FirebaseAppConfig } from '../../node_modules/angularfire2';
import { AngularFireAuthModule } from '../../node_modules/angularfire2/auth';
import { AngularFireDatabaseModule } from '../../node_modules/angularfire2/database';
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
      }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyBX_z7enOY_yYre2X4Z0tCbFtyKpcF7KqM",
  authDomain: "fitness-app-47.firebaseapp.com",
  databaseURL: "https://fitness-app-47.firebaseio.com",
  projectId: "fitness-app-47",
  storageBucket: "fitness-app-47.appspot.com",
  messagingSenderId: "692842574156"
};
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {}