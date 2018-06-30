import { NgModule } from "../../../node_modules/@angular/core";
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { AuthGuard } from '../../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
  { path: 'schedule', canActivate: [AuthGuard], loadChildren: './schedule/schedule.module#ScheduleModule' },
  { path: 'meals', canActivate: [AuthGuard], loadChildren: './meals/meals.module#MealsModule' },
  { path: 'workouts', canActivate: [AuthGuard], loadChildren: './workouts/workouts.module#WorkoutsModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class HealthModule {}