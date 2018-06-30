import { NgModule } from "../../../node_modules/@angular/core";
import { RouterModule, Routes } from '../../../node_modules/@angular/router';

export const ROUTES: Routes = [
  { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule' },
  { path: 'meals', loadChildren: './meals/meals.module#MealsModule' },
  { path: 'workouts', loadChildren: './workouts/workouts.module#WorkoutsModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
  ]
})
export class HealthModule {}