import { Injectable } from '@angular/core';
import { Routine } from '../core/typedefs/routine.class';
import { Task } from '../core/typedefs/task.class';
import { Time } from '../core/typedefs/time.class';

@Injectable({
  providedIn: 'root'
})

// holds and grants access to data for all user-defined routines
export class RoutinesService {
  public routines: Routine[] = [];

  constructor() {
    // placeholders for now
    this.routines.push(new Routine("Test", [new Task("Task 1", new Time(0, 0, 2), "#ff0000"), new Task("Task 2", new Time(0, 0, 3), "#00ff00")]));
  }

  addRoutine(routine: Routine): number {
    this.routines.push(routine);
    return this.routines.indexOf(routine);
  }

  deleteRoutine(routine: Routine) {
    this.routines.splice(this.routines.indexOf(routine), 1);
  }

  updateRoutine(routine: Routine, { name = null }: { name?: string | null }) {
    if (name !== null) {
      routine.name = name;
    }
  }

  addTask(routine: Routine, task: Task): number {
    routine.tasks.push(task);
    return routine.tasks.indexOf(task);
  }

  updateTask(task: Task,
    { name = null, time = null, color = null }: { name?: string | null, time?: Time | null, color?: string | null }) {

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

  deleteTask(routine: Routine, task: Task) {
    routine.tasks.splice(routine.tasks.indexOf(task), 1);
  }

  reorderTasks(routine: Routine, previousIndex: number, currentIndex: number): void {
    routine.tasks.splice(currentIndex, 0, routine.tasks.splice(previousIndex, 1)[0]);
  }
}
