// Example code for an ngram GitHub integration walkthrough.

export type ReportRow = Record<string, string | number | null>;

/** Escape a single value so commas, quotes and line breaks stay intact. */
function escapeCell(value: string | number | null): string {
  if (value === null) return "";
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Turn report rows into CSV text, using the given column order. */
export function toCsv(rows: ReportRow[], columns: string[]): string {
  const header = columns.map(escapeCell).join(",");
  const body = rows.map((row) => columns.map((c) => escapeCell(row[c] ?? null)).join(","));
  return [header, ...body].join("\n");
}

/** Download the current report view as a .csv file the user can open in a spreadsheet. */
export function downloadReportCsv(name: string, rows: ReportRow[], columns: string[]): void {
  const blob = new Blob([toCsv(rows, columns)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
