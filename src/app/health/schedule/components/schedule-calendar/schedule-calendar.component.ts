import { Component, Input, Output, EventEmitter, OnChanges } from "../../../../../../node_modules/@angular/core";

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      <schedule-controls [selected]="selectedDay" (move)="onChange($event)"></schedule-controls>
      <schedule-days [selected]="selectedDayIndex" (select)="selectDay($event)"></schedule-days>
    </div>
  `
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;
  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }
  @Output()
  change = new EventEmitter<Date>();

  constructor() {}

  ngOnChanges() {
    this.selectedDayIndex = this.selectedDay.getDay() - 1 < 0 ? 6 : this.selectedDay.getDay() - 1;
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  selectDay(index: number): void {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }
  
  onChange(weekOffset: number): void {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.change.emit(startDate);
  }

  private getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}