export function getVisiblePages(current: number, total: number): number[] {
  if (total <= 6) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const result: number[] = [];

  result.push(1);

  let start = current - 2;
  let end = current + 2;

  if (start < 2) {
    start = 2;
    end = start + 4;
  }
  if (end > total) {
    end = total;
    start = end - 4;
    if (start < 2) start = 2;
  }

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return Array.from(new Set(result)).sort((a, b) => a - b);
}
