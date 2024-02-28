import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../core/typedefs/task.class';
import { Time } from '../core/typedefs/time.class';
import { Routine } from '../core/typedefs/routine.class';

@Injectable({
  providedIn: 'root'
})
export class TaskTrackingService {
  private timer: any;

  private activeRoutine: Routine = {} as Routine;
  private activeTask: Task | null = null;
  private isPaused: boolean = true;
  private remainingTime = new Time(0, 0, 0);

  private activeRoutineSubject = new BehaviorSubject<Routine>({} as Routine);
  private activeTaskSubject = new BehaviorSubject<Task>({} as Task);
  private isPausedSubject = new BehaviorSubject<boolean>(this.isPaused);
  private remainingTimeSubject = new BehaviorSubject<Time>(this.remainingTime);

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
    } else {
      this.startTimer();
    }
  }

  togglePauseStatus() {
    this.setPauseStatus(!this.isPaused);
  }

  getActiveRoutine(): Observable<Routine> {
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
    this.activeTaskSubject.next(task);
    this.activeTask = task;
    this.setRemainingTime(task.time);
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
      this.remainingTime = new Time(this.remainingTime.toSeconds() - 1);
      this.remainingTimeSubject.next(this.remainingTime);

      if (this.remainingTime.toSeconds() <= 0 && this.activeTask) {
        const nextTaskIndex = this.activeRoutine.tasks.indexOf(this.activeTask) + 1;
        if (nextTaskIndex < this.activeRoutine.tasks.length) {
          const nextTask = this.activeRoutine.tasks[nextTaskIndex];
          this.setActiveTask(nextTask);
        } else {
          this.setPauseStatus(true);
          this.activeTask = null;
        }
      }
    }, 1000); // Decrease time every second
  }

  private stopTimer() {
    clearInterval(this.timer);
  }
}
