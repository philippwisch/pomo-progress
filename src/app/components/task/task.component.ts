import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../core/typedefs/task.class';
import { Routine } from '../../core/typedefs/routine.class';
import { RoutinesService } from '../../services/routines.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Time } from '../../core/typedefs/time.class';
import { PadWithZeroesPipe } from "../../core/pipes/pad-with-zeroes.pipe";

@Component({
    selector: 'app-task',
    standalone: true,
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss',
    imports: [CommonModule, FormsModule, MatInputModule, PadWithZeroesPipe]
})
export class TaskComponent {
  // REQUIRED INPUTS
  @Input() routine!: Routine;
  @Input() task!: Task;

  constructor(private routineService: RoutinesService) { }

  private updateTask(updatedValues: { name?: string | null, time?: Time | null, color?: string | null }) {
    this.routineService.updateTask(this.task, updatedValues);
  }

  onNameChange(input: HTMLInputElement) {
    this.updateTask({ name: input.value });
  }

  onHourChange(input: HTMLInputElement) {
    const hours = this.handleTimeInput(input, false);
    this.updateTask({ time: new Time(hours, this.task.time.minutes, this.task.time.seconds) });
  }

  onMinuteChange(input: HTMLInputElement) {
    const minutes = this.handleTimeInput(input, true);
    this.updateTask({ time: new Time(this.task.time.hours, minutes, this.task.time.seconds) });
  }

  onSecondChange(input: HTMLInputElement) {
    const seconds = this.handleTimeInput(input, true);
    this.updateTask({ time: new Time(this.task.time.hours, this.task.time.minutes, seconds) });
  }

  private handleTimeInput(input: HTMLInputElement, limitTo60: boolean) {
    const value = parseInt(input.value);
    let result: number | string;

    if (isNaN(value)) {
      result = 0;
    } else {
      if (value === -1) {
        // if pressing the down button at 00 "underflow" and set to max
        result = limitTo60 ? 59 : 99;
      } else {
        // if negative simply flip the sign
        result = Math.abs(value)
        // if more than 2 digits crop it down to the last 2
        result %= 100;
        // change out-of-bounds to 0
        if (limitTo60 && result > 59) {
          result %= 10;
        }
      }
    }
    result = result.toString().padStart(2, '0');
    input.value = result;
    return result;
  }

  onColorChange(input: HTMLInputElement) {
    this.updateTask({ color: input.value });
  }
}
