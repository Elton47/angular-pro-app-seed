import { Component, OnInit, OnDestroy } from "../../../../../../node_modules/@angular/core";
import { Workout, WorkoutsService } from '../../../shared/services/workouts/workouts.service';
import { Router, ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { Observable } from '../../../../../../node_modules/rxjs/Observable';
import { Subscription } from '../../../../../../node_modules/rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'workout',
  styleUrls: ['workout.component.scss'],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="/img/workout.svg">
          <span *ngIf="workout$ | async as workout; else title;">{{ workout.name ? 'Edit' : 'Create' }} workout</span>
          <ng-template #title>Loading...</ng-template>
        </h1>
      </div>
      <div *ngIf="workout$ | async as workout; else loading;">
        <workout-form
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)">
        </workout-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg">
          Fetching workout...
        </div>
      </ng-template>
    </div>
  `
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$: Observable<Workout>;
  subscription: Subscription;
  
  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params
      .switchMap(param => this.workoutsService.getWorkout(param.id));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    await this.workoutsService.updateWorkout(this.route.snapshot.params.id, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: Workout) {
    await this.workoutsService.removeWorkout(this.route.snapshot.params.id);
    this.backToWorkouts();
  }

  backToWorkouts(): void {
    this.router.navigate(['workouts']);
  }
}