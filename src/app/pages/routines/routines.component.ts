import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Routine } from '../../core/typedefs/routine.class';
import { RoutinesService } from '../../services/routines.service';
import { Task } from '../../core/typedefs/task.class';
import { TaskComponent } from "../../components/task/task.component";
import { Time } from '../../core/typedefs/time.class';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-routines',
  standalone: true,
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss',
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, TaskComponent, DragDropModule]
})
export class RoutinesComponent {
  // Using a querylist to get a reference to every routine name input
  // The callback will run after an element on this list is added or removed to the DOM
  // so it will already exist and there is no need for timeout()
  // very nice solution, thank you ConnorsFan on Stackoverflow
  // https://stackoverflow.com/questions/53328041/angular6-autofocus-using-ngif
  // https://stackblitz.com/edit/angular-txho39?file=src%2Fapp%2Fapp.component.ts

  @ViewChildren("name") private name!: QueryList<ElementRef>;
  ngAfterViewInit() {
    this.name.changes.subscribe((list: QueryList<ElementRef>) => {
      if (list.length > 0) {
        list.first.nativeElement.focus();
      }
    });
  }

  routines: Routine[];
  selectedRoutine: Routine | null = null;
  selectedForEditRoutine: Routine | null = null;

  constructor(private routineService: RoutinesService) {
    this.routines = this.routineService.routines;
    // todo get last selected routine from appState Service
    // or else just select the first routine
    this.selectFirstRoutine();
  }

  selectRoutine(routine: Routine) {
    this.selectedRoutine = routine;
  }

  selectFirstRoutine() {
    if (this.routines.length > 0) {
      this.selectRoutine(this.routines[0]);
    } else {
      this.selectedRoutine = null;
    }
  }

  editRoutine(routine: Routine) {
    this.selectedForEditRoutine = routine;
  }

  saveRoutine(routine: Routine, name: string) {
    this.selectedForEditRoutine = null;
    this.updateRoutine(routine, { name: name });
  }

  addRoutine() {
    let newRoutine = new Routine("New Routine", [new Task("", new Time(0, 5, 0), "#ff0000")]);
    this.routineService.addRoutine(newRoutine);
    this.selectedRoutine = newRoutine;
    // todo autofocus for editing the name
  }

  deleteRoutine(routine: Routine) {
    if (this.selectedRoutine === routine) {
      this.selectedRoutine = null;
    }
    this.routineService.deleteRoutine(routine);
    if (this.selectedRoutine === null) {
      this.selectFirstRoutine();
    }
  }

  updateRoutine(routine: Routine, updatedValues: { name?: string | null }) {
    this.routineService.updateRoutine(routine, updatedValues);
  }

  addTask(routine: Routine) {
    // todo: pick random color or check existing tasks for a task with the same name and copy its color
    const newTask = new Task("", new Time(0, 5, 0), "#ff0000"); // default values for new task
    this.routineService.addTask(routine, newTask);
  }

  // todo change this to work with task reference and BEFORE or AFTER as a parameter to avoid using indexes
  duplicateTask(routine: Routine, task: Task) {
    const newTask = { ...task };
    const duplicateIndex = this.routineService.addTask(routine, newTask);
    const originalIndex = routine.tasks.indexOf(task);
    this.routineService.reorderTasks(routine, duplicateIndex, originalIndex);
  }

  deleteTask(routine: Routine, task: Task) {
    this.routineService.deleteTask(routine, task);
  }

  onTaskListDrop(event: CdkDragDrop<string[]>) {
    if (!(this.selectedRoutine === null)) {
      this.routineService.reorderTasks(this.selectedRoutine, event.previousIndex, event.currentIndex);
    }
  }
}
