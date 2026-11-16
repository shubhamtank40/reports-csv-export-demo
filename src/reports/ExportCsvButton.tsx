// Example code for an ngram GitHub integration walkthrough.
import { downloadReportCsv, ReportRow } from "./exportCsv";

type Props = { reportName: string; rows: ReportRow[]; columns: string[] };

/** "Export CSV" button shown in the report toolbar. Exports exactly what the user sees, filters included. */
export function ExportCsvButton({ reportName, rows, columns }: Props) {
  return (
    <button
      type="button"
      disabled={rows.length === 0}
      onClick={() => downloadReportCsv(reportName, rows, columns)}
    >
      Export CSV
    </button>
  );
}
