import { NgModule } from "../../../node_modules/@angular/core";
import { CommonModule } from '../../../node_modules/@angular/common';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { RouterModule, Routes } from '../../../node_modules/@angular/router';
import { ScheduleComponent } from './containers/workouts/schedule.component';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
import { SharedModule } from '../shared/shared.module';
import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';

export const ROUTES: Routes = [
  { path: '', component: ScheduleComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleControlsComponent,
    ScheduleDaysComponent,
    ScheduleSectionComponent,
    ScheduleAssignComponent
  ]
})
export class ScheduleModule {}