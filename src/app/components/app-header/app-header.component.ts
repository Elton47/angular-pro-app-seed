import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from "../../../../node_modules/@angular/core";
import { User } from '../../../auth/shared/services/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app-header.component.scss'],
  template: `
    <div class="app-header">
      <div class="wrapper">
        <a href=""><img src="/img/logo.svg" /></a>
        <div class="app-header__user-info" *ngIf="user?.authenticated">
          <span (click)="logoutUser()"></span>
        </div>
      </div>
    </div>
  `
})
export class AppHeaderComponent {
  @Input()
  user: User;
  @Output()
  logout = new EventEmitter<any>();

  logoutUser(): void {
    this.logout.emit();
  }
}