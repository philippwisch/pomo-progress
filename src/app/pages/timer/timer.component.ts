import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { RoutinesService } from '../../services/routines.service';
import { Routine } from '../../core/typedefs/routine.class';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { TaskTrackingService as taskTrackingService } from '../../services/task-tracking.service';
import { Task } from '../../core/typedefs/task.class';
import { Subscription } from 'rxjs';
import { Time } from '../../core/typedefs/time.class';
import { PadWithZeroesPipe } from "../../core/pipes/pad-with-zeroes.pipe";


@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  imports: [CommonModule, FormsModule, MatCheckboxModule, MatButtonModule, MatSelectModule, MatSidenavModule, MatIconModule, PadWithZeroesPipe]
})
export class TimerComponent {
  routines: Routine[];
  activeRoutine: Routine | null = null;
  activeTask: Task | null = null;
  isPaused: boolean = true;
  timeRemaining: Time = new Time(0, 0, 0);

  private activeRoutineSubscription: Subscription | undefined;
  private activetaskSubscription: Subscription | undefined;
  private pauseStatusSubscription: Subscription | undefined;
  private remainingTimeSubscription: Subscription | undefined;

  constructor(private routineService: RoutinesService, private taskTrackingService: taskTrackingService) {
    this.activeRoutineSubscription = this.taskTrackingService.getActiveRoutine().subscribe(routine => this.activeRoutine = routine);
    this.activetaskSubscription = this.taskTrackingService.getActiveTask().subscribe(task => this.activeTask = task);
    this.pauseStatusSubscription = this.taskTrackingService.getPauseStatus().subscribe(status => this.isPaused = status);
    this.remainingTimeSubscription = this.taskTrackingService.getRemainingTime().subscribe(time => {
      this.timeRemaining = time;
    })

    this.routines = this.routineService.routines;
  }

  ngOnDestroy(): void {
    if (this.activetaskSubscription) {
      this.activetaskSubscription.unsubscribe();
    }
    if (this.pauseStatusSubscription) {
      this.pauseStatusSubscription.unsubscribe();
    }
    if (this.remainingTimeSubscription) {
      this.remainingTimeSubscription.unsubscribe();
    }
    if (this.activeRoutineSubscription) {
      this.activeRoutineSubscription.unsubscribe();
    }
  }

  toggleTaskPaused() {
    this.taskTrackingService.togglePauseStatus();
  }

  skipTask() { }

  onRoutineChange() {
    this.taskTrackingService.setPauseStatus(true);
    if (this.activeRoutine) {
      this.taskTrackingService.setActiveRoutine(this.activeRoutine);
      if (this.activeRoutine.tasks.length > 0) {
        this.taskTrackingService.setActiveTask(this.activeRoutine.tasks[0]);
        this.taskTrackingService.setRemainingTime(this.activeRoutine.tasks[0].time);
      }
    }
  }
}
