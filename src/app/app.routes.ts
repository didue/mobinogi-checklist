import { Routes } from '@angular/router';
import { TrackerPage } from './pages/tracker/tracker-page/tracker-page';
import { HomePage } from './pages/home/home-page/home-page';
import { authGuard } from './core/auth/auth.guard';
import { AuthPages } from './pages/auth/auth-pages/auth-pages';

export const routes: Routes = [
  // { path: '', component: HomePage },
  {
    path: '',
    component: TrackerPage,
    // resolve: { initial: DailyMissionResolver }
  },
  {
    path: 'auth',
    component: AuthPages,
  },
  {
    path: 'admin',
    canMatch: [authGuard],
    component: AuthPages,
    // resolve: { initial: DailyMissionResolver }
  },
  { path: '**', redirectTo: '' },
];
