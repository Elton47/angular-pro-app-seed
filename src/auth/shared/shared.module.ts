import { NgModule, ModuleWithProviders } from "../../../node_modules/@angular/core";
import { CommonModule } from '../../../node_modules/@angular/common';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthFormComponent
  ],
  exports: [
    AuthFormComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService
      ]
    };
  }
}