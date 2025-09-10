import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MissionApi } from './mission.api';

export const DailyMissionResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const missionApi = inject(MissionApi);

  return missionApi.getDaily().pipe(catchError(() => of(null)));
};
