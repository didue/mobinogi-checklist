import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Mission } from '../model';
import { map } from 'rxjs';
import { groupBy } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class MissionApi {
  private http = inject(HttpClient);
  private base = '';

  getDaily() {
    return this.http.get<Mission[]>(`${this.base}/missions?category=daily&enabled=true`);
  }
  getWeekly() {
    return this.http.get<Mission[]>(`${this.base}/missions?category=weekly&enabled=true`);
  }
  getWeeklyGroupByType() {
    return this.http
      .get<Mission[]>(`${this.base}/missions?category=weekly&enabled=true`)
      .pipe(map((missions) => groupBy(missions, 'type')));
  }
  getExchange() {
    return this.http.get<Mission[]>(`${this.base}/missions?category=exchange&enabled=true`);
  }
  getShopMission() {
    return this.http.get<Mission[]>(`${this.base}/missions?category=mission&enabled=true`);
  }
}
