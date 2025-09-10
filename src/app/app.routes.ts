import { Routes } from '@angular/router';
import { TrackerPage } from './pages/tracker/tracker-page/tracker-page';

export const routes: Routes = [
  {
    path: '',
    component: TrackerPage,
    // resolve: { initial: DailyMissionResolver }
  },
  { path: '**', redirectTo: '' },
];
