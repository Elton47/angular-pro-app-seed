import { Injectable } from "../../../../../../node_modules/@angular/core";
import { Store } from 'store';
import { AngularFireDatabase } from '../../../../../../node_modules/angularfire2/database';
import { Observable } from '../../../../../../node_modules/rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { AuthService } from '../../../../../auth/shared/services/auth.service';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {
  meals$: Observable<Meal[]> = this.db.list(`meals/${this.uid}`)
    .do<Meal[]>(next => this.store.set('meals', next));
  
  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid(): string {
    return this.authService.user.uid;
  }

  getMeal(key: string) {
    if (!key)
      return Observable.of({});
    return this.store.select<Meal[]>('meals')
      .filter(Boolean)
      .map(meals => meals.find((meal: Meal) => meal.$key === key));
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}