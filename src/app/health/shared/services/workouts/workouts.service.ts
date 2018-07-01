import { Injectable } from "../../../../../../node_modules/@angular/core";
import { Store } from 'store';
import { AngularFireDatabase } from '../../../../../../node_modules/angularfire2/database';
import { Observable } from '../../../../../../node_modules/rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { AuthService } from '../../../../../auth/shared/services/auth.service';

export interface Workout {
  name: string,
  type: string,
  strength: any,
  endurance: any,
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class WorkoutsService {
  workouts$: Observable<Workout[]> = this.db.list(`workouts/${this.uid}`)
    .do<Workout[]>(next => this.store.set('workouts', next));
  
  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid(): string {
    return this.authService.user.uid;
  }

  getWorkout(key: string) {
    if (!key)
      return Observable.of({});
    return this.store.select<Workout[]>('workouts')
      .filter(Boolean)
      .map(workouts => workouts.find((workout: Workout) => workout.$key === key));
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}