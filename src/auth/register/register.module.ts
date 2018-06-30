import { NgModule } from "../../../node_modules/@angular/core";
import { CommonModule } from '../../../node_modules/@angular/common';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { RegisterComponent } from './containers/register/register.component';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [
  {
    path: '',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule {}