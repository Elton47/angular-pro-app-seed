import { Injectable } from "../../../../../../node_modules/@angular/core";
import { Observable } from '../../../../../../node_modules/rxjs/Observable';
import { BehaviorSubject } from '../../../../../../node_modules/rxjs/BehaviorSubject';
import { Store } from 'store';

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  schedule$: Observable<any[]> = this.date$
    .do((next: any) => this.store.set('date', next));
  
  constructor(
    private store: Store
  ) {}
}