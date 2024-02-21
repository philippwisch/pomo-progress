import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Routine } from '../../typedefs/routine.class';
import { RoutinesService } from '../../services/routines.service';
import { Task } from '../../typedefs/task.class';

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss'
})
export class RoutinesComponent {
  routines: Routine[];
  selectedRoutine: Routine | null = null;

  constructor(private routineService: RoutinesService) {
    this.routines = this.routineService.routines;
  }

  selectRoutine(routine: any) {
    this.selectedRoutine = routine;
    // todo change the other display with routineSteps
  }

  addRoutine() {
    this.routines.push(new Routine("New Routine", []));
    this.selectedRoutine = this.routines[this.routines.length - 1];
  }

  addTask() {
    if (!(this.selectedRoutine === null)) {
      this.selectedRoutine.tasks.push(new Task("New Task", 5, "red"));
    }
  }
}
