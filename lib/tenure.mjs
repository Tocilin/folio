// Shared by the resume page (Next.js) and the PDF generator (plain Node).
// Entries with a "startDate" ("YYYY-MM") get a live tenure appended to
// their dates, e.g. "Aug 2026 - Present (3 mos)".

export function formatTenure(startDate, now = new Date()) {
  const [year, month] = startDate.split("-").map(Number);
  const total = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  const months = Math.max(total, 0);
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  const parts = [];
  if (yrs > 0) parts.push(`${yrs} ${yrs === 1 ? "yr" : "yrs"}`);
  if (mos > 0 || yrs === 0) parts.push(`${mos} ${mos === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

export function entryDates(entry, now = new Date()) {
  return entry.startDate ? `${entry.dates} (${formatTenure(entry.startDate, now)})` : entry.dates;
}
