import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mission, Settings } from './model/Mission';
import { Character } from './model/Character';
import { Completion } from './model/Completion';

@Injectable({ providedIn: 'root' })
export class Api {
  private http = inject(HttpClient);
  private base = '/api'; // 프록시 쓰면 /api → localhost:3000

  characters() {
    return this.http.get<Character[]>(`${this.base}/characters`);
  }
  missions() {
    return this.http.get<Mission[]>(`${this.base}/missions`);
  }
  settings() {
    return this.http.get<Settings>(`${this.base}/settings`);
  } // 단일 리소스면 json-server에선 /settings 로 get/put
  getSettings() {
    return this.http.get<Settings>(`${this.base}/settings`);
  }
  putSettings(s: Settings) {
    return this.http.put<Settings>(`${this.base}/settings`, s);
  }

  completionsBy(params: Partial<Pick<Completion, 'characterId' | 'missionId' | 'periodKey'>>) {
    const q = new URLSearchParams(params as Record<string, string>);
    return this.http.get<Completion[]>(`${this.base}/completions?${q.toString()}`);
  }
  addCompletion(c: Omit<Completion, 'id'>) {
    return this.http.post<Completion>(`${this.base}/completions`, c);
  }
  deleteCompletion(id: number) {
    return this.http.delete(`${this.base}/completions/${id}`);
  }

  updateMissionEnabled(id: number, enabled: boolean) {
    return this.http.patch<Mission>(`${this.base}/missions/${id}`, { enabled });
  }

  addCharacter(c: Omit<Character, 'id'>) {
    return this.http.post<Character>(`${this.base}/characters`, c);
  }
  deleteCharacter(id: number) {
    return this.http.delete(`${this.base}/characters/${id}`);
  }
}
