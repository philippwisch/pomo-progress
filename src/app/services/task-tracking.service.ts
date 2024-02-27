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
  }

  getActiveTask(): Observable<Task> {
    return this.activeTaskSubject.asObservable();
  }

  setActiveTask(task: Task) {
    this.activeTaskSubject.next(task);
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
    }, 1000); // Decrease time every second
  }

  private stopTimer() {
    clearInterval(this.timer);
  }
}
