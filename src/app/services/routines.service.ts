import { Injectable } from '@angular/core';
import { Routine } from '../typedefs/routine.class';
import { Task } from '../typedefs/task.class';
import { Time } from '../typedefs/time.class';

@Injectable({
  providedIn: 'root'
})

// holds and grants access to data for all user-defined routines
export class RoutinesService {
  public routines: Routine[] = [];

  constructor() {
    // placeholders for now
    this.routines.push(new Routine("Pomodoro", [new Task("Work", new Time(0, 25, 0), "#ff0000"), new Task("Rest", new Time(0, 5, 0), "#00ff00")]));
  }

  addRoutine(routine: Routine) {
    console.log("debug message -> added routine")
    this.routines.push(routine);
  }

  addTask(routine: Routine, task: Task) {
    console.log("debug message -> added task")
    routine.tasks.push(task);
  }

  updateTask(routine: Routine, oldTask: Task,
    { name = null, time = null, color = null }: { name?: string | null, time?: Time | null, color?: string | null }) {
    console.log("debug message -> updated task")
    console.log(name, time, color)
    let task = routine.tasks[routine.tasks.indexOf(oldTask)];

    if (name !== null) {
      task.name = name;
    }
    if (time !== null) {
      task.time = time;
    }
    if (color !== null) {
      task.color = color;
    }
  }
}
