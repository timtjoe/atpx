import { atom } from "jotai";
import { TrendingService } from "./TrendService";

export const trendingAtom = atom<any[]>([]);
export const isLoadingTrendsAtom = atom(false);

// Action atom to refresh data
export const fetchTrendsAction = atom(null, async (get, set) => {
  set(isLoadingTrendsAtom, true);
  try {
    const data = await TrendingService.list();
    set(trendingAtom, data);
  } finally {
    set(isLoadingTrendsAtom, false);
  }
});
