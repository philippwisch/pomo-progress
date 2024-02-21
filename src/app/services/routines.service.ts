import { Injectable } from '@angular/core';
import { Routine } from '../typedefs/routine.class';
import { Task } from '../typedefs/task.class';

@Injectable({
  providedIn: 'root'
})

// holds and grants access to data for all user-defined routines
export class RoutinesService {
  public routines: Routine[] = [];

  constructor() {
    // placeholders for now
    this.routines.push(new Routine("Pomodoro", [new Task("Work", 25, "red"), new Task("Rest", 5, "green")]));
    this.routines.push(new Routine("Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro Pomodoro ", [new Task("Work", 25, "red"), new Task("Rest", 5, "green")]));
  }
}
