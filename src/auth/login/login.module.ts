import { NgModule } from "../../../node_modules/@angular/core";
import { CommonModule } from '../../../node_modules/@angular/common';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}