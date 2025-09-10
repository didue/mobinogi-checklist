// src/app/core/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character, Mission } from './model';

export type ApiSettings = { showCategories: string[] };
export type ApiCompletion = {
  id: number;
  characterId: number;
  missionId: number;
  periodKey: string;
};

@Injectable({ providedIn: 'root' })
export class Api {
  private http = inject(HttpClient);
  private base = '/api';

  // 목록
  characters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.base}/characters`);
  }
  missions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.base}/missions`);
  }
  settings(): Observable<ApiSettings> {
    return this.http.get<ApiSettings>(`${this.base}/settings`);
  }
  // 설정 업데이트(선택)
  putSettings(s: ApiSettings) {
    return this.http.put<ApiSettings>(`${this.base}/settings`, s);
  }

  // 미션 사용 여부 토글(선택)
  patchMissionEnabled(id: number, enabled: boolean) {
    return this.http.patch<Mission>(`${this.base}/missions/${id}`, { enabled });
  }

  // 완료(체크) CRUD — 단일 단위 1건씩 기록
  listCompletions(params: Partial<Pick<ApiCompletion, 'characterId' | 'missionId' | 'periodKey'>>) {
    const q = new URLSearchParams(params as Record<string, string>);
    return this.http.get<ApiCompletion[]>(`${this.base}/completions?${q.toString()}`);
  }
  addCompletion(payload: Omit<ApiCompletion, 'id'>) {
    return this.http.post<ApiCompletion>(`${this.base}/completions`, payload);
  }
  deleteCompletion(id: number) {
    return this.http.delete<void>(`${this.base}/completions/${id}`);
  }
}
