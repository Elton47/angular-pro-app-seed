import { NgModule } from "../../../../node_modules/@angular/core";
import { CommonModule } from '../../../../node_modules/@angular/common';
import { ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';
import { WorkoutsComponent } from './containers/workouts/workouts.component';

export const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    WorkoutsComponent
  ]
})
export class WorkoutsModule {}