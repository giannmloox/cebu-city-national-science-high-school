export function parsePageRange(range: string, maxPage: number): { pages: number[]; error?: string } {
  if (!range) {
    return { pages: [], error: 'Page range cannot be empty.' };
  }
  const parts = range.split(',').map(p => p.trim()).filter(Boolean);
  const pageSet = new Set<number>();
  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-').map(s => s.trim());
      const start = Number(startStr);
      const end = Number(endStr);
      if (isNaN(start) || isNaN(end) || start < 1 || end < 1) {
        return { pages: [], error: `Invalid range "${part}".` };
      }
      if (start > end) {
        return { pages: [], error: `Start page greater than end page in "${part}".` };
      }
      if (end > maxPage) {
        return { pages: [], error: `Page number ${end} exceeds document length (${maxPage}).` };
      }
      for (let i = start; i <= end; i++) {
        pageSet.add(i);
      }
    } else {
      const num = Number(part);
      if (isNaN(num) || num < 1) {
        return { pages: [], error: `Invalid page number "${part}".` };
      }
      if (num > maxPage) {
        return { pages: [], error: `Page number ${num} exceeds document length (${maxPage}).` };
      }
      pageSet.add(num);
    }
  }
  const pages = Array.from(pageSet).sort((a, b) => a - b);
  return { pages };
}
