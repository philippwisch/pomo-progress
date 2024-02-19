import { Routes } from '@angular/router';
import { TimerComponent } from './pages/timer/timer.component';
import { RoutinesComponent } from './pages/routines/routines.component';
import { TimelineComponent } from './pages/timeline/timeline.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GoalsComponent } from './pages/goals/goals.component';

export const routes: Routes = [
    { path: 'timer', component: TimerComponent },
    { path: 'routines', component: RoutinesComponent },
    { path: 'timeline', component: TimelineComponent },
    { path: 'progress', component: ProgressComponent },
    { path: 'goals', component: GoalsComponent },
];
