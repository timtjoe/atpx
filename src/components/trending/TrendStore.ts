import { atom } from "jotai";
import { Trend } from "@types";
import { TrendingService } from "./TrendService";

export const withTrend = atom<Trend[]>([]);
const isLoading = atom<boolean>(false);

export const trendActions = atom(
  null,
  async (_get, set): Promise<void> => {
    set(isLoading, true);
    try {
      const data = await TrendingService.list();
      set(withTrend, data);
    } catch (error) {
      throw error;
    } finally {
      set(isLoading, false);
    }
  }
);