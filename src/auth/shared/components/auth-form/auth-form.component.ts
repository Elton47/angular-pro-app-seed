import { Component, Output, EventEmitter } from "../../../../../node_modules/@angular/core";
import { FormBuilder, Validators, FormGroup } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'auth-form',
  styleUrls: ['auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <ng-content select="h1"></ng-content>
        <label>
          <input type="email" placeholder="Email address" formControlName="email" />
        </label>
        <label>
          <input type="password" placeholder="Enter password" formControlName="password" />
        </label>
        <div class="error" *ngIf="emailFormat">Invalid email format</div>
        <div class="error" *ngIf="passwordInvalid">Password is required</div>
        <ng-content select=".error"></ng-content>
        <div class="auth-form__action">
          <ng-content select="button"></ng-content>
        </div>
        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>
      </form>
    </div>
  `
})
export class AuthFormComponent {
  form = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });
  @Output()
  submitted = new EventEmitter<FormGroup>();

  constructor(
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get emailFormat(): boolean {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }

  get passwordInvalid(): boolean {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }
}