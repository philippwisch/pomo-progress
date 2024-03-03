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
import { Observable, Subscription } from 'rxjs';
import { Time } from '../../core/typedefs/time.class';
import { FormatTimePipe } from "../../core/pipes/format-time.pipe";
import { DarkModeService } from '../../services/dark-mode.service';
import { AppStateService } from '../../services/app-state.service';


@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  imports: [CommonModule, FormsModule, MatCheckboxModule, MatButtonModule, MatSelectModule, MatSidenavModule, MatIconModule, FormatTimePipe]
})
export class TimerComponent {
  routines: Routine[];
  activeRoutine: Routine | null = null;
  activeTask: Task | null = null;
  isPaused: boolean = true;
  timeRemaining: Time = new Time(0, 0, 0);

  adjustedBackgroundColor$: Observable<string> | null = null;
  adjustedTaskColors$!: Observable<string>[];

  private activeRoutineSubscription: Subscription | undefined;
  private activeTaskSubscription: Subscription | undefined;
  private pauseStatusSubscription: Subscription | undefined;
  private remainingTimeSubscription: Subscription | undefined;


  constructor(
    public appStateService: AppStateService,
    public taskTrackingService: taskTrackingService,
    private routineService: RoutinesService,
    private darkModeService: DarkModeService,
  ) {
    this.routines = this.routineService.routines;

    this.activeRoutineSubscription = this.taskTrackingService.getActiveRoutine().subscribe(routine => {
      this.activeRoutine = routine

      if (!this.activeRoutine && this.routines.length > 0) {
        // if there is no selected routine, simply select the first by default
        this.taskTrackingService.setActiveRoutine(this.routines[0]);
      }

      // adjusted colors for each task
      if (this.activeRoutine) {
        this.adjustedTaskColors$ = this.activeRoutine.tasks.map(task => this.darkModeService.registerColor(task.color));
      }
    });

    this.activeTaskSubscription = this.taskTrackingService.getActiveTask().subscribe(task => {
      this.activeTask = task;
      this.adjustedBackgroundColor$ = this.darkModeService.registerColor(task.color);
    });

    this.pauseStatusSubscription = this.taskTrackingService.getPauseStatus().subscribe(status => this.isPaused = status);

    this.remainingTimeSubscription = this.taskTrackingService.getRemainingTime().subscribe(time => {
      this.timeRemaining = time;
    })
  }

  ngOnDestroy(): void {
    if (this.activeTaskSubscription) {
      this.activeTaskSubscription.unsubscribe();
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

  onTaskSelect(task: Task) {
    // don't switch tasks if the selected task is already active
    // because it's unnecessary
    if (task !== this.activeTask) {
      this.taskTrackingService.setActiveTask(task);
    }
  }
}
