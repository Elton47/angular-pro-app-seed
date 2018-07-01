import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from "../../../../../../node_modules/@angular/core";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '../../../../../../node_modules/@angular/forms';
import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workout-form.component.scss'],
  template: `
    <div class="workout-form">
      <form [formGroup]="form">
        <div class="workout-form__name">
          <label>
            <h3>Workout name</h3>
            <input type="text" placeholder="e.g. English Breakfast" formControlName="name">
            <div class="error" *ngIf="required">Workout name is required</div>
          </label>
          <label>
            <h3>Type</h3>
            <workout-type formControlName="type"></workout-type>
          </label>
        </div>
        <div class="workout-form__submit">
          <div>
            <button *ngIf="!exists" type="button" class="button" (click)="createWorkout()">Create workout</button>
            <button *ngIf="exists" type="button" class="button" (click)="updateWorkout()">Save</button>
            <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
          </div>
          <div class="workout-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button class="confirm" type="button" (click)="removeWorkout()">Yes</button>
              <button class="cancel" type="button" (click)="toggle()">No</button>
            </div>
            <button class="button button--delete" type="button" (click)="toggle()">Delete</button>
          </div>
        </div>
      </form>
    </div>
  `
})
export class WorkoutFormComponent implements OnChanges {
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    type: 'strength',

  });
  toggled: boolean = false;
  exists: boolean = false;
  @Input()
  workout: Workout;
  @Output()
  create = new EventEmitter<Workout>();
  @Output()
  update = new EventEmitter<Workout>();
  @Output()
  remove = new EventEmitter<Workout>();
  
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.workout && this.workout.name) {
    //   this.exists = true;
    //   this.emptyIngredients();
    //   this.form.patchValue(this.workout);
    //   if (this.workout.ingredients)
    //     for (const item of this.workout.ingredients)
    //       this.ingredients.push(new FormControl(item));
    // }
  }

  get required(): boolean {
    return this.form.get('name').hasError('required') && this.form.get('name').touched;
  }
  
  // get ingredients() {
  //   return this.form.get('ingredients') as FormArray;
  // }

  // addIngredient(): void {
  //   this.ingredients.push(new FormControl(''));
  // }
  
  // removeIngredient(index: number): void {
  //   this.ingredients.removeAt(index);
  // }
  
  createWorkout(): void {
    if (this.form.valid)
      this.create.emit(this.form.value);
  }

  updateWorkout(): void {
    if (this.form.valid)
      this.update.emit(this.form.value);
  }

  removeWorkout(): void {
    this.remove.emit(this.form.value);
  }

  toggle(): void {
    this.toggled = !this.toggled;
  }

  // emptyIngredients(): void {
  //   while(this.ingredients.controls.length)
  //     this.ingredients.removeAt(0);
  // }
}