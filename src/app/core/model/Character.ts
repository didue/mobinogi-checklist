// 캐릭터 도메인
export interface Character {
  id: number; //id
  name: string; //캐릭터 명
  server: string; //서버명
  silverCoin: number; //은동전
  demonTribute: number; //마족공물
  majorYn: 'Y' | 'N'; //대표캐릭터 여부
  thumbnail?: string; //썸네일이미지
}
