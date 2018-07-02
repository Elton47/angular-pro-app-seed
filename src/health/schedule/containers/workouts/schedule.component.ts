import { Component, OnInit, OnDestroy } from "../../../../../node_modules/@angular/core";
import { Observable } from '../../../../../node_modules/rxjs/Observable';
import { ScheduleService, ScheduleItem } from '../../../shared/services/schedule/schedule.service';
import { Subscription } from '../../../../../node_modules/rxjs/Subscription';
import { Store } from 'store';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar [date]="date$ | async" [items]="schedule$ | async" (change)="changeDate($event)"></schedule-calendar>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService
  ) {}

  changeDate(date: Date): void {
    this.scheduleService.updateDate(date);
  }

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}