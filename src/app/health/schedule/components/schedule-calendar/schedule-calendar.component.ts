import { Component, Input } from "../../../../../../node_modules/@angular/core";

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      {{ date | json }}
    </div>
  `
})
export class ScheduleCalendarComponent {
  @Input()
  date: Date;
}