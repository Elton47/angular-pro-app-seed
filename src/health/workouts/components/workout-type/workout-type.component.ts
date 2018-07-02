import { Component, ChangeDetectionStrategy, forwardRef } from "../../../../../node_modules/@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '../../../../../node_modules/@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
}

@Component({
  selector: 'workout-type',
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workout-type.component.scss'],
  template: `
    <div class="workout-type">
      <div class="workout-type__pane" *ngFor="let selector of selectors" [class.active]="selector === value" (click)="setSelected(selector)">
        <p>{{ selector }}</p>
        <img src="/img/{{ selector }}.svg">
      </div>
    </div>
  `
})
export class WorkoutTypeComponent implements ControlValueAccessor {
  selectors: string[] = ['strength', 'endurance'];
  value: string;
  private onTouch: Function;
  private onModelChange: Function;

  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  setSelected(value: string): void {
    this.value = value;
    this.onModelChange(value);
    this.onTouch();
  }
}