import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
  selectedRoutineIndex: number | null = null;
  selectedRoutineForEditIndex: number | null = null;

  constructor(private routineService: RoutinesService) {
    this.routines = this.routineService.routines;
    if (this.routines.length > 0) {
      this.selectedRoutineIndex = 0; // todo get this from app prefs or soms app state storage service
    }
  }

  selectRoutine(index: number) {
    this.selectedRoutineIndex = index;
    console.log(this.routines[this.selectedRoutineIndex].tasks);
  }

  editRoutine(index: number) {
    this.selectedRoutineForEditIndex = index;
  }

  saveRoutine(index: number, name: string) {
    this.selectedRoutineForEditIndex = null;
    this.routineService.updateRoutine(index, { name: name });
  }

  addRoutine() {
    let newRoutine = new Routine("New Routine", [new Task("", new Time("", "", ""), "#ff0000")]);
    this.selectedRoutineIndex = this.routineService.addRoutine(newRoutine);

    // todo autofocus for editing the name
  }

  deleteRoutine(index: number) {
    this.routineService.deleteRoutine(index);
    if (this.selectedRoutineIndex === index) {
      console.log("should work lol");
      this.selectedRoutineIndex = null;
    }
  }

  updateRoutine(param: { name?: string | null }) {
    if (!(this.selectedRoutineForEditIndex === null)) {
      this.routineService.updateRoutine(this.selectedRoutineForEditIndex, param);
    }
  }

  addTask() {
    if (!(this.selectedRoutineIndex === null)) {
      // todo: pick random color
      let newTask = new Task("", new Time(0, 5, 0), "#ff0000"); // default values for new task
      this.routineService.addTask(this.routines[this.selectedRoutineIndex], newTask);
    }
  }

  duplicateTask(index: number) {
    if (!(this.selectedRoutineIndex === null)) {
      const dupIndex = this.routineService.addTask(this.routines[this.selectedRoutineIndex], { ...this.routines[this.selectedRoutineIndex].tasks[index] });
      this.routineService.reorderTasks(this.routines[this.selectedRoutineIndex], dupIndex, index);
    }
  }

  deleteTask(index: number) {
    if (!(this.selectedRoutineIndex === null)) {
      this.routineService.deleteTask(this.routines[this.selectedRoutineIndex], index);
    }
  }

  onTaskListDrop(event: CdkDragDrop<string[]>) {
    if (!(this.selectedRoutineIndex === null)) {
      this.routineService.reorderTasks(this.routines[this.selectedRoutineIndex], event.previousIndex, event.currentIndex);
    }
  }
}
