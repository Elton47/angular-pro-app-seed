import { Component, OnInit, OnDestroy } from "../../../../../node_modules/@angular/core";
import { Meal, MealsService } from '../../../shared/services/meals/meals.service';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Observable } from '../../../../../node_modules/rxjs/Observable';
import { Subscription } from '../../../../../node_modules/rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg">
          <span *ngIf="meal$ | async as meal; else title;">{{ meal.name ? 'Edit' : 'Create' }} meal</span>
          <ng-template #title>Loading...</ng-template>
        </h1>
      </div>
      <div *ngIf="meal$ | async as meal; else loading;">
        <meal-form
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)">
        </meal-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg">
          Fetching meal...
        </div>
      </ng-template>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy {
  meal$: Observable<Meal>;
  subscription: Subscription;
  
  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params
      .switchMap(param => this.mealsService.getMeal(param.id));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event: Meal) {
    await this.mealsService.updateMeal(this.route.snapshot.params.id, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    await this.mealsService.removeMeal(this.route.snapshot.params.id);
    this.backToMeals();
  }

  backToMeals(): void {
    this.router.navigate(['meals']);
  }
}