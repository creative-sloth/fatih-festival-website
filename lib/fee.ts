import type { Lang } from '@/content/types';

// Fees are stored once, exactly as the committee wrote them (Indonesian unit). English pages swap only the unit word.
const UNITS_EN: Record<string, string> = { peserta: 'participant', tim: 'team' };

export function formatFee(fee: string | null, lang: Lang): string | null {
  if (!fee || lang === 'id') return fee;
  return fee.replace(/\/\s*(peserta|tim)\b/, (_, unit: string) => `/ ${UNITS_EN[unit]}`);
}
