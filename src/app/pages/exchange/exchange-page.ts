import { Component, input, output } from '@angular/core';
import { Exchange } from '../../core/model';

// 부모가 들려주는 표시 데이터
export interface ExchangeRuntime {
  done: number; // 현재 수행 횟수
  needed: number; // 필요 횟수 (== mission.count)
  completed: boolean; // done >= needed
}

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [],
  templateUrl: './exchange-page.html',
  styleUrl: './exchange-page.scss',
})
export class ExchangePage {
  exchange = input.required<Exchange>();
  state = input.required<ExchangeRuntime>();

  // 이벤트: missionId와 증감(+1 / -1)
  inc = output<number>();
  dec = output<number>();

  onInc() {
    this.inc.emit(this.exchange().id);
  }
  onDec() {
    this.dec.emit(this.exchange().id);
  }
}
