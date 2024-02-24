import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Routine } from '../../typedefs/routine.class';
import { RoutinesService } from '../../services/routines.service';
import { Task } from '../../typedefs/task.class';
import { TaskComponent } from "../../components/task/task.component";
import { Time } from '../../typedefs/time.class';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-routines',
  standalone: true,
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss',
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, TaskComponent, DragDropModule]
})
export class RoutinesComponent {
  routines: Routine[];
  selectedRoutine: Routine | null = null;

  constructor(private routineService: RoutinesService) {
    this.routines = this.routineService.routines;
    if (this.routines.length > 0) {
      this.selectedRoutine = this.routines[0];
    }
  }

  selectRoutine(routine: any) {
    this.selectedRoutine = routine;
    // todo change the other display with routineSteps
  }

  addRoutine() {
    let newRoutine = new Routine("New Routine", [new Task("", new Time("", "", ""), "#ff0000")]);
    this.routineService.addRoutine(newRoutine);
    this.selectedRoutine = newRoutine;
    // todo autofocus for editing the name
  }

  deleteRoutine(index: number) {
    this.routineService.deleteRoutine(index);
  }

  addTask() {
    if (!(this.selectedRoutine === null)) {

      // todo: pick random color
      let newTask = new Task("", new Time(0, 5, 0), "#ff0000"); // default values for new task
      this.routineService.addTask(this.selectedRoutine, newTask);
    }
  }

  duplicateTask(index: number) {
    if (!(this.selectedRoutine === null)) {
      this.routineService.addTask(this.selectedRoutine, { ...this.selectedRoutine.tasks[index] });
      this.routineService.reorderTasks(this.selectedRoutine, this.selectedRoutine.tasks.length - 1, index);
    }
  }

  deleteTask(index: number) {
    if (!(this.selectedRoutine === null)) {
      this.routineService.deleteTask(this.selectedRoutine, index);
    }
  }

  onTaskListDrop(event: CdkDragDrop<string[]>) {
    if (!(this.selectedRoutine === null)) {
      this.routineService.reorderTasks(this.selectedRoutine, event.previousIndex, event.currentIndex);
    }
  }
}
