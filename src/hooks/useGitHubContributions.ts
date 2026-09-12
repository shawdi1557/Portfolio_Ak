import { useEffect, useState } from "react";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: ApiDay[];
}

const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(iso: string): string {
  const [, monthStr, dayStr] = iso.split("-");
  const month = MONTH_ABBR[parseInt(monthStr, 10) - 1];
  const day = parseInt(dayStr, 10);
  return `${month} ${day}`;
}

/**
 * Fetches last-year contribution data for `username`.
 * Returns the full-year total from the API (matches GitHub''s own "X contributions in the last year").
 */
export function useGitHubContributions(username: string, days = 53) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [yearTotal, setYearTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        if (cancelled) return;

        const all: ApiDay[] = data.contributions ?? [];
        const slice = all.slice(-days);
        const formatted: ContributionDay[] = slice.map((d) => ({
          date: formatDate(d.date),
          count: d.count,
          level: d.level,
        }));

        // Use the API''s own "lastYear" total — matches GitHub''s headline number
        const apiTotal = data.total?.lastYear ?? slice.reduce((s, d) => s + d.count, 0);

        setContributions(formatted);
        setYearTotal(apiTotal);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("[useGitHubContributions]", err);
        setError(String(err));
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [username, days]);

  return { contributions, yearTotal, loading, error };
}
