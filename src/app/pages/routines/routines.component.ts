import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

const dummies = [
  "pepper",
  "salt",
  "paprika",
  "pepper",
  "salt",
  "paprika",    
  "pepper",
  "salt",
  "paprika",
  "pepper",
  "salt",
  "paprika",
  "pepper",
  "salt",
  "paprika",
  "pepper",
  "salt",
  "paprika",
  "pepper",
  "salt",
  "paprika",
  "pepper",
  "salt",
  "paprika",
]

const routines = [
  "work",
  "sports"
]

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './routines.component.html',
  styleUrl: './routines.component.scss'
})
export class RoutinesComponent {
  dummies = dummies;
  routines: string[] = routines;
  selectedRoutine: string | null = null;

  selectRoutine(routine: any) {
    this.selectedRoutine = routine;
    // todo change the other display with routineSteps
  }
}
