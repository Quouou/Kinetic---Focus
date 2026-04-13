export interface Track {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  day: string;
  icon: string;
}

export interface DashboardData {
  focusScore: number;
  dailyMomentum: {
    current: number;
    target: number;
  };
  upcomingTracks: Track[];
  learningNetwork: {
    topPercent: number;
    friendsCount: number;
  };
}

export interface StatsData {
  monthlyTotal: number;
  monthlyGrowth: number;
  dailyAverage: number;
  calendar: {
    day: string;
    date: number;
    status: "completed" | "partial" | "missed";
  }[];
  successfulCheckins: number;
}

export type View = "dashboard" | "focus" | "stats" | "settings";
