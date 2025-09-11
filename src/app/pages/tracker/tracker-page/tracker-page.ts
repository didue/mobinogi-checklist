import { CommonModule } from '@angular/common';
import { Component, computed, effect, HostListener, inject, signal } from '@angular/core';
//Api
import { Api } from '@/app/core/api.service';
//Types
import { Character, Completion, Mission } from '@/app/core/model';
import { Category } from '@/app/core/model/Mission';
//Utils
import { periodKey } from '@/app/common/period.util';
//Components
import { MissionItem } from '../../mission/mission-item/mission-item';

type TabKey = 'daily' | 'weekly' | 'exchange' | 'shop';

@Component({
  selector: 'app-tracker-page',
  standalone: true,
  imports: [CommonModule, MissionItem],
  templateUrl: './tracker-page.html',
  styleUrl: './tracker-page.scss',
})
export class TrackerPage {
  private api = inject(Api);

  // 탭
  tab = signal<TabKey>('daily');

  // 원본 데이터 (도메인 타입 그대로)
  characters = signal<Character[]>([]);
  missionsRaw = signal<Mission[]>([]);
  completions = signal<Completion[]>([]);

  // 선택 캐릭터
  selectedCharId = signal<number>(0);

  missions = computed<Mission[]>(() => this.missionsRaw());

  // 현재 탭에 보이는 미션(설정 enabled=true만)
  visible = computed(() => {
    const t = this.tab();
    return this.missions().filter(
      (m) =>
        m.enabled &&
        ((t === 'daily' && m.category === 'daily') ||
          (t === 'weekly' && m.category === 'weekly') ||
          (t === 'exchange' && m.category === 'exchange') ||
          (t === 'shop' && m.category === 'shop'))
    );
  });

  // 완료수 맵: missionId -> 현재 완료 횟수 (한 건 = 1회)
  private doneMap = computed<Map<number, number>>(() => {
    const map = new Map<number, number>();
    for (const c of this.completions()) {
      map.set(c.missionId, (map.get(c.missionId) ?? 0) + 1);
    }
    return map;
  });

  // 진행률 = Σ(각 미션의 완료수 capped) / Σ(각 미션의 필요수)
  progress = computed(() => {
    const list = this.visible();
    const totalNeeded = list.reduce((acc, m) => acc + m.count, 0) || 1;
    const dm = this.doneMap();
    const totalDone = list.reduce((acc, m) => acc + Math.min(dm.get(m.id) ?? 0, m.count), 0);
    return Math.round((totalDone / totalNeeded) * 100);
  });

  constructor() {
    // 초기 로드
    this.loadCharacters();
    this.loadMissions();

    // 선택 캐릭터/탭(=기간키)에 따라 완료 목록 새로고침
    effect(() => {
      const cid = this.selectedCharId();
      if (!cid) return;
      const pk = this.currentPeriodKey(this.tab());
      this.refreshCompletions(cid, pk);
    });
  }

  // ===== API 로드 =====
  private loadCharacters() {
    this.api.characters().subscribe((list: Character[]) => {
      this.characters.set(list);
      const primary = list.find((c) => c.majorYn === 'Y');
      this.selectedCharId.set(primary?.id ?? list[0]?.id ?? 0);
    });
  }

  private loadMissions() {
    this.api.missions().subscribe((list: Mission[]) => {
      this.missionsRaw.set(list);
    });
  }

  private refreshCompletions(characterId: number, periodKey: string) {
    this.api
      .listCompletions({ characterId, periodKey })
      .subscribe((list: Completion[]) => this.completions.set(list));
  }

  // ===== 도우미 =====
  private currentPeriodKey(tab: TabKey): string {
    // exchange/shop을 별도 주기로 다룬다면 여기서 분기 확장
    const typeForTab: Record<TabKey, Category> = {
      daily: 'daily',
      weekly: 'weekly',
      exchange: 'weekly', // 임시 가정
      shop: 'weekly', // 임시 가정
    };
    return periodKey(typeForTab[tab]);
  }

  stateOf(m: Mission) {
    const done = this.doneMap().get(m.id) ?? 0;
    return { done, needed: m.count, completed: done >= m.count };
  }

  // ===== UI 이벤트 =====
  onClickTab(t: TabKey) {
    this.tab.set(t);
  }

  onSelectChar(id: number) {
    if (this.selectedCharId() === id) return;
    this.selectedCharId.set(id);
    // effect가 자동으로 completions 갱신
  }

  onInc(id: number) {
    const cid = this.selectedCharId();
    if (!cid) return;
    const m = this.missions().find((x) => x.id === id);
    if (!m) return;

    // 현재 미션의 주기에 맞는 periodKey로 1회 추가
    const pk = periodKey(m.category);
    const cur = this.doneMap().get(id) ?? 0;
    if (cur >= m.count) return;

    this.api
      .addCompletion({ characterId: cid, missionId: id, periodKey: pk })
      .subscribe((created: Completion) => this.completions.set([...this.completions(), created]));
  }

  onDec(id: number) {
    const m = this.missions().find((x) => x.id === id);
    if (!m) return;

    // 이 미션의 최신 한 건을 찾아 삭제(간단화)
    const target = [...this.completions()].reverse().find((c) => c.missionId === id);
    if (!target) return;

    this.api.deleteCompletion(target.id).subscribe(() => {
      this.completions.set(this.completions().filter((c) => c.id !== target.id));
    });
  }

  //다이어로그 상태
  dialog = signal<null | 'char' | 'goal'>(null);

  openDialog(kind: 'char' | 'goal') {
    this.dialog.set(kind);
  }
  closeDialog() {
    this.dialog.set(null);
  }

  // ESC로 닫기
  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeDialog();
  }

  // 저장 버튼 예시 (실제 로직은 필요 시 구현)
  saveCharSettings() {
    // TODO: 캐릭터 설정 저장 로직
    this.closeDialog();
  }
  saveGoalSettings() {
    // TODO: 목표 설정 저장 로직
    this.closeDialog();
  }
}
