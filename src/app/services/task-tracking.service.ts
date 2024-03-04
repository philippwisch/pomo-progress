import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../core/typedefs/task.class';
import { Time } from '../core/typedefs/time.class';
import { Routine } from '../core/typedefs/routine.class';

@Injectable({
  providedIn: 'root'
})
export class TaskTrackingService {
  public isAutoStartNextTask: boolean = false;
  public isAutoRepeatRoutine: boolean = false;


  private activeRoutine: Routine | null = null;
  private activeTask: Task | null = null;
  private isPaused: boolean = true;
  private remainingTime = new Time(0, 0, 0);

  private activeRoutineSubject = new BehaviorSubject<Routine | null>(null);
  private activeTaskSubject = new BehaviorSubject<Task>({} as Task);
  private isPausedSubject = new BehaviorSubject<boolean>(this.isPaused);
  private remainingTimeSubject = new BehaviorSubject<Time>(this.remainingTime);

  private timer: any;

  constructor() {
  }

  getPauseStatus(): Observable<boolean> {
    return this.isPausedSubject.asObservable();
  }

  setPauseStatus(status: boolean) {
    this.isPaused = status;
    this.isPausedSubject.next(status);
    if (status) {
      this.stopTimer();
    } else if (!this.timer) {
      this.startTimer();
    }
  }

  togglePauseStatus() {
    this.setPauseStatus(!this.isPaused);
  }

  getActiveRoutine(): Observable<Routine | null> {
    return this.activeRoutineSubject.asObservable();
  }
  setActiveRoutine(routine: Routine) {
    this.activeRoutineSubject.next(routine);
    this.activeRoutine = routine;
    this.setPauseStatus(true);

    if (routine.tasks.length > 0) {
      this.setActiveTask(routine.tasks[0]);
    }
  }

  getActiveTask(): Observable<Task> {
    return this.activeTaskSubject.asObservable();
  }

  setActiveTask(task: Task) {
    // if any time has been spent on the task, add a history entry for that task
    // if the task before that was the same as this task, combine them both together?
    this.activeTaskSubject.next(task);
    this.activeTask = task;
    this.setRemainingTime(task.time);
  }

  nextTask() {
    this.moveToTask(+1);
  }

  prevTask() {
    this.moveToTask(-1);
  }

  private moveToTask(offset: number) {
    if (this.activeRoutine) {
      const currentTaskIndex = this.activeRoutine.tasks.indexOf(this.activeTask!);
      // Calculate the next task index considering the offset
      let nextTaskIndex = (currentTaskIndex + offset) % this.activeRoutine.tasks.length;
      // Adjust negative indices to wrap around to the end of the task list
      if (nextTaskIndex < 0) {
        nextTaskIndex += this.activeRoutine.tasks.length;
      }
      this.setActiveTask(this.activeRoutine!.tasks[nextTaskIndex]);
      this.setPauseStatus(!this.isAutoStartNextTask);
    }
  }

  getRemainingTime(): Observable<Time> {
    return this.remainingTimeSubject.asObservable();
  }

  setRemainingTime(time: Time) {
    this.remainingTime = time;
    this.remainingTimeSubject.next(time);
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.decreaseRemainingTime();
      this.checkTaskCompletion();
    }, 1000); // Decrease time every second
  }

  private stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  private decreaseRemainingTime() {
    // decrease time by 1 second
    const updatedSeconds = this.remainingTime.toSeconds() - 1;
    this.setRemainingTime(new Time(updatedSeconds));
  }

  private checkTaskCompletion() {
    // if the task is ending
    if (this.remainingTime.toSeconds() <= 0 && this.activeTask) {
      const nextTaskIndex = this.activeRoutine!.tasks.indexOf(this.activeTask) + 1;

      if (nextTaskIndex < this.activeRoutine!.tasks.length) {
        // if there are more tasks
        this.nextTask();
      } else {
        // if this was the last task
        this.handleRoutineCompletion();
      }
    }
  }

  private handleRoutineCompletion() {
    this.setActiveRoutine(this.activeRoutine!); // this will reset the routine to the beginning
    this.setPauseStatus(!this.isAutoRepeatRoutine);
  }
}
