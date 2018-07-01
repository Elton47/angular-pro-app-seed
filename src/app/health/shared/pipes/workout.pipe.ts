import { Pipe, PipeTransform } from "../../../../../node_modules/@angular/core";

@Pipe({
  name: 'workout'
})
export class WorkoutPipe implements PipeTransform {
  transform(value: any) {
    if (value.type === 'endurance') {
      return `Distance: ${value.endurance.distance}km, Duration: ${value.endurance.duration}mins`;
    } else {
      return `
        Sets: ${value.strength.sets},
        Reps: ${value.strength.reps},
        Weight: ${value.strength.weight}kg
      `;
    }
  }
}