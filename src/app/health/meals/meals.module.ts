import { NgModule } from "../../../../node_modules/@angular/core";
import { CommonModule } from '../../../../node_modules/@angular/common';
import { ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';
import { MealsComponent } from './containers/meals/meals.component';

export const ROUTES: Routes = [
  { path: '', component: MealsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    MealsComponent
  ]
})
export class MealsModule {}