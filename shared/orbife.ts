export const GATEKEEPER_TOTAL_QUESTIONS = 5;
export const GATEKEEPER_PASSING_SCORE = 4;

export function gatekeeperPass(score: number, total = GATEKEEPER_TOTAL_QUESTIONS) {
  return score >= Math.ceil(total * 0.8);
}

export function formatCount(value: number) {
  if (value < 1000) return String(value);
  return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1).replace('.0', '')}k`;
}
