import { Injectable } from "../../../../../../node_modules/@angular/core";
import { Store } from 'store';
import { AngularFireDatabase } from '../../../../../../node_modules/angularfire2/database';
import { Observable } from '../../../../../../node_modules/rxjs/Observable';
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
  meals$: Observable<Meal[]> = this.db.list(`meals/${this.authService.user.uid}`)
    .do<Meal[]>(next => this.store.set('meals', next));
  
  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}
}