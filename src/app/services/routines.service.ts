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

    let longRoutine = new Routine("Degenerate Lifestyle", []);
    for (let i = 0; i < 100; i++) {
      longRoutine.tasks.push(new Task("Watch Anime", new Time(20, 0, 0), "#00ffff"));
      longRoutine.tasks.push(new Task("Sleep", new Time(4, 0, 0), "#ff00ff"));
    }
    this.routines.push(longRoutine);
    this.routines.push(new Routine("Pomodoro", [new Task("Work", new Time(0, 25, 0), "#ff0000"), new Task("Rest", new Time(0, 5, 0), "#00ff00")]));
  }

  /**
   * 
   * @param routine Routine that will be added
   * @returns Index of the new routine
   */
  addRoutine(routine: Routine): number {
    this.routines.push(routine);
    return this.routines.length - 1;
  }

  deleteRoutine(index: number) {
    this.routines.splice(index, 1);
  }

  updateRoutine(index: number, { name = null }: { name?: string | null }) {
    if (name !== null) {
      this.routines[index].name = name;
    }
  }

  addTask(routine: Routine, task: Task) {
    routine.tasks.push(task);
    return routine.tasks.length - 1;
  }

  updateTask(routine: Routine, index: number,
    { name = null, time = null, color = null }: { name?: string | null, time?: Time | null, color?: string | null }) {
    let task = routine.tasks[index];

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

  deleteTask(routine: Routine, index: number) {
    routine.tasks.splice(index, 1);
  }

  reorderTasks(routine: Routine, previousIndex: number, currentIndex: number): void {
    routine.tasks.splice(currentIndex, 0, routine.tasks.splice(previousIndex, 1)[0]);
  }
}
