export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  const weeks: (ContributionDay | null)[][] = [];
  let currentWeek: (ContributionDay | null)[] = [];

  days.forEach((day) => {
    const [y, m, d] = day.date.split('-').map(Number);
    const dayOfWeek = new Date(Date.UTC(y, m - 1, d)).getUTCDay();

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }

    if (weeks.length === 0 && currentWeek.length === 0) {
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(null);
      }
    }

    currentWeek.push(day);
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

export function buildHeatmapSvg(days: ContributionDay[]) {
  const weeks = buildWeeks(days);
  const cellStep = 13;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let lastMonth = -1;
  let monthsHtml = '';

  weeks.forEach((week, weekIndex) => {
    const firstValidDay = week.find((d) => d !== null);
    if (firstValidDay) {
      const monthIndex = Number(firstValidDay.date.split('-')[1]) - 1;
      if (monthIndex !== lastMonth) {
        if (weekIndex <= weeks.length - 2 || weekIndex === 0) {
          monthsHtml += `<text x="${weekIndex * cellStep + 2}" y="12" class="month-label font-mono text-[9px] fill-[var(--color-text-secondary)]">${monthNames[monthIndex]}</text>`;
        }
        lastMonth = monthIndex;
      }
    }
  });

  let cellsHtml = '';
  weeks.forEach((week, colIndex) => {
    cellsHtml += `<g transform="translate(${colIndex * cellStep + 2}, 20)">`;
    week.forEach((day, rowIndex) => {
      if (day) {
        cellsHtml += `<rect class="contribution-cell level-${day.level}" x="0" y="${rowIndex * cellStep}" width="10" height="10" rx="2" data-date="${day.date}" data-count="${day.count}" tabindex="0"><title>${day.count === 0 ? 'No' : day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}</title></rect>`;
      }
    });
    cellsHtml += '</g>';
  });

  const width = Math.max(weeks.length * cellStep - 3 + 4, 690);
  return {
    width,
    height: 110,
    html: monthsHtml + cellsHtml,
  };
}

const proc = (globalThis as any).process;
if (proc?.argv && import.meta.url === `file://${proc.argv[1]}`) {
  const sample = [
    { date: '2026-09-14', count: 2, level: 1 },
    { date: '2026-09-15', count: 5, level: 3 },
  ];
  const weeks = buildWeeks(sample);
  console.assert(weeks.length > 0, 'weeks should not be empty');
  const svg = buildHeatmapSvg(sample);
  console.assert(svg.html.includes('level-3'), 'svg should include level-3 cell');
  console.assert(svg.width >= 690, 'width should be at least 690');
  console.log('Heatmap self-check passed.');
}
