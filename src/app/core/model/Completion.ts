// 완료 체크 1건 = "특정 기간(periodKey)에 이 미션을 이 캐릭으로 완료함"
export interface Completion {
  id: number;
  characterId: number;
  missionId: number;
  periodKey: string; // daily: YYYY-MM-DD, weekly: YYYY-Www
}
