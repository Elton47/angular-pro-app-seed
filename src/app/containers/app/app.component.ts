import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from 'store';
import { AuthService, User } from '../../../auth/shared/services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <app-header [user]="user$ | async" (logout)="onLogout()"></app-header>
    <app-nav *ngIf="(user$ | async)?.authenticated"></app-nav>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer *ngIf="(user$ | async)?.authenticated"></app-footer>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select('user');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }
}
