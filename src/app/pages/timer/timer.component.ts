import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { RoutinesService } from '../../services/routines.service';
import { Routine } from '../../core/typedefs/routine.class';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { TaskTrackingService as taskTrackingService } from '../../services/task-tracking.service';
import { Task } from '../../core/typedefs/task.class';
import { Subscription } from 'rxjs';
import { Time } from '../../core/typedefs/time.class';
import { PadWithZeroesPipe } from "../../core/pipes/pad-with-zeroes.pipe";
import { MathAbsPipe } from "../../core/pipes/math-abs.pipe";


@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  imports: [CommonModule, FormsModule, MatCheckboxModule, MatButtonModule, MatSelectModule, MatSidenavModule, MatIconModule, PadWithZeroesPipe, MathAbsPipe]
})
export class TimerComponent {
  routines: Routine[];
  activeRoutine: Routine | null = null;
  activeTask: Task | null = null;
  isPaused: boolean = true;
  timeRemaining: Time = new Time(0, 0, 0);
  timeRemainingSign: string = "abc";

  private activeRoutineSubscription: Subscription | undefined;
  private activetaskSubscription: Subscription | undefined;
  private pauseStatusSubscription: Subscription | undefined;
  private remainingTimeSubscription: Subscription | undefined;

  constructor(private routineService: RoutinesService, public taskTrackingService: taskTrackingService) {
    this.routines = this.routineService.routines;


    this.activeRoutineSubscription = this.taskTrackingService.getActiveRoutine().subscribe(routine => {
      this.activeRoutine = routine
      if (!this.activeRoutine && this.routines.length > 0) {
        // if there is no selected routine, simply select the first by default
        this.taskTrackingService.setActiveRoutine(this.routines[0]);
      }
    });
    this.activetaskSubscription = this.taskTrackingService.getActiveTask().subscribe(task => this.activeTask = task);

    this.pauseStatusSubscription = this.taskTrackingService.getPauseStatus().subscribe(status => this.isPaused = status);

    this.remainingTimeSubscription = this.taskTrackingService.getRemainingTime().subscribe(time => {
      this.timeRemaining = time;
      this.timeRemainingSign = this.timeRemaining.toSeconds() < 0 ? "-" : "";
    })
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

  onActiveRoutineChange(event: MatSelectChange) {
    this.taskTrackingService.setActiveRoutine(event.value);
  }
}
