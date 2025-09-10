export interface Exchange {
  id: number;
  title: string; //미션타이틀
  ingredient: string; //재료
  qty: number; //재료수량
  npc: string; //npc명
  location: string; //마을 위치
  enabled: boolean; //노출여부
  tradeLimit: number; //교환가능횟수
}
