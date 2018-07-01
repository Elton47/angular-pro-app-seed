import { NgModule, ModuleWithProviders } from "../../../../node_modules/@angular/core";
import { CommonModule } from '../../../../node_modules/@angular/common';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { AngularFireDatabaseModule } from '../../../../node_modules/angularfire2/database';
import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';
import { ListItemComponent } from './components/list-item/list-item.component';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  exports: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService
      ]
    };
  }
}