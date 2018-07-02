import { Injectable } from "../../../../../node_modules/@angular/core";
import { Observable } from '../../../../../node_modules/rxjs/Observable';
import { BehaviorSubject } from '../../../../../node_modules/rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Store } from 'store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AngularFireDatabase } from '../../../../../node_modules/angularfire2/database';
import { AuthService } from '../../../../auth/shared/services/auth.service';
import { Subject } from '../../../../../node_modules/rxjs/Subject';

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  selected$ = this.section$
    .do((next: any) => this.store.set('selected', next))
  schedule$: Observable<ScheduleItem[]> = this.date$
    .do((next: any) => this.store.set('date', next))
    .map((day: any) => {
      const startAt = (new Date(day.getFullYear(), day.getMonth(), day.getDate())).getTime();
      const endAt = (new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)).getTime() - 1;
      return { startAt, endAt };
    })
    .switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt))
    .map((data: any) => {
      const mapped: ScheduleList = {};
      for (const prop of data)
        if (!mapped[prop.section])
          mapped[prop.section] = prop;
      return mapped;
    })
    .do((next: any) => this.store.set('schedule', next));
  
  constructor(
    private store: Store,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {}

  updateDate(date: Date): void {
    this.date$.next(date);
  }

  selectSection(event: any): void {
    this.section$.next(event);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list(`schedule/${this.authService.user.uid}`, {
      query: {
        orderByChild: 'timestamp',
        startAt,
        endAt
      }
    });
  }
}