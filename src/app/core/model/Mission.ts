//미션
export type MissionType =
  | '일일 컨텐츠'
  | '필드보스'
  | '어비스'
  | '레이드'
  | '주간 컨텐츠'
  | '임무게시판';

//
export type Category = 'daily' | 'weekly' | 'exchange' | 'shop';

export interface Mission {
  id: number;
  category: Category;
  type: MissionType;
  title: string; //미션타이틀
  enabled: boolean; //
  count: number; //미션횟수
  rewards: string; //보상
  qty: number; //수량
}

export interface Settings {
  showCategories: Category[];
}
