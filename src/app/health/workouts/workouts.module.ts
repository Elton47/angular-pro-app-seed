import { NgModule } from "../../../../node_modules/@angular/core";
import { CommonModule } from '../../../../node_modules/@angular/common';
import { ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';
import { WorkoutsComponent } from './containers/workouts/workouts.component';
import { SharedModule } from '../shared/shared.module';
import { WorkoutComponent } from './containers/workout/workout.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutTypeComponent } from './components/workout-type/workout-type.component';

export const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent },
  { path: 'new', component: WorkoutComponent },
  { path: ':id', component: WorkoutComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    WorkoutsComponent,
    WorkoutComponent,
    WorkoutFormComponent,
    WorkoutTypeComponent
  ]
})
export class WorkoutsModule {}