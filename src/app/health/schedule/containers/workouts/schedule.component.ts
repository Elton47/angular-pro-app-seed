import { Component, OnInit, OnDestroy } from "../../../../../../node_modules/@angular/core";
import { Observable } from '../../../../../../node_modules/rxjs/Observable';
import { ScheduleService } from '../../../shared/services/schedule/schedule.service';
import { Subscription } from '../../../../../../node_modules/rxjs/Subscription';
import { Store } from 'store';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar [date]="date$ | async"></schedule-calendar>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}