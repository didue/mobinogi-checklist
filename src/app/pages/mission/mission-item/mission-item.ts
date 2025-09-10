import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mission } from '../../../core/model';

// 부모가 들려주는 표시 데이터
export interface MissionRuntime {
  done: number; // 현재 수행 횟수
  needed: number; // 필요 횟수 (== mission.count)
  completed: boolean; // done >= needed
}

@Component({
  selector: 'app-mission-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-item.html',
  styleUrl: './mission-item.scss',
})
export class MissionItem {
  //rotue
  private route = inject(ActivatedRoute);

  mission = input.required<Mission>();
  state = input.required<MissionRuntime>();

  //Resolver data
  data = this.route.snapshot.data['initial'];

  // 이벤트: missionId와 증감(+1 / -1)
  inc = output<number>();
  dec = output<number>();

  onInc() {
    this.inc.emit(this.mission().id);
  }
  onDec() {
    this.dec.emit(this.mission().id);
  }
}
