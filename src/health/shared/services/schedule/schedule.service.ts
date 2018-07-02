import { Injectable } from "../../../../../node_modules/@angular/core";
import { Observable } from '../../../../../node_modules/rxjs/Observable';
import { BehaviorSubject } from '../../../../../node_modules/rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
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
  private itemList$ = new Subject();
  items$ = this.itemList$
    .withLatestFrom(this.section$)
    .map(([ items, section ]: any[]) => {
      const id = section.data.$key;
      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };
      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };
      if (id)
        return this.updateSection(id, payload);
      else
        return this.createSection(payload);
    })
  list$ = this.section$
    .map((value: any) => this.store.value[value.type])
    .do((next: any) => this.store.set('list', next));
  selected$ = this.section$
    .do((next: any) => this.store.set('selected', next));
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

  updateItems(items: string[]): void {
    this.itemList$.next(items);
  }

  updateDate(date: Date): void {
    this.date$.next(date);
  }
  
  selectSection(event: any): void {
    this.section$.next(event);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return this.db.object(`schedule/${this.authService.user.uid}/${key}`).update(payload);
  }

  private createSection(payload: ScheduleItem) {
    return this.db.list(`schedule/${this.authService.user.uid}`).push(payload);
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