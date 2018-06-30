import { Injectable } from '../../../../node_modules/@angular/core';
import { Router, CanActivate } from '../../../../node_modules/@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate() {
    return this.authService.authState
      .map((user) => {
        if (!user)
          this.router.navigate(['/auth/login']);
        return !!user;
      });
  }
}