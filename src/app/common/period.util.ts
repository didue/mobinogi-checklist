// 기간키 생성 유틸: daily(YYYY-MM-DD) / weekly(YYYY-Www, ISO 주차)

import { Category } from '../core/model';

export function dailyKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function weeklyKey(d = new Date()): string {
  // ISO week (목요일 포함 주)
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - dayNum + 3);

  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const week =
    1 +
    Math.round(
      ((+date - +firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7
    );

  const w = String(week).padStart(2, '0');
  return `${date.getUTCFullYear()}-W${w}`;
}

export function periodKey(type: Category, d = new Date()): string {
  return type === 'daily' ? dailyKey(d) : weeklyKey(d);
}
