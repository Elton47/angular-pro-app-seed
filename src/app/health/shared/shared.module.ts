import { NgModule, ModuleWithProviders } from "../../../../node_modules/@angular/core";
import { CommonModule } from '../../../../node_modules/@angular/common';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { AngularFireDatabaseModule } from '../../../../node_modules/angularfire2/database';
import { MealsService } from './services/meals/meals.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService
      ]
    };
  }
}