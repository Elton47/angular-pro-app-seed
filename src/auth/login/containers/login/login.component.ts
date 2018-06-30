import { Component } from '../../../../../node_modules/@angular/core';
import { FormGroup } from '../../../../../node_modules/@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">Login</button>
        <div class="error" *ngIf="error">
          {{ error }}
        </div>
      </auth-form>
    </div>
  `
})
export class LoginComponent {
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
 
  async loginUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (e) {
      this.error = e.message;
    }
  }
}