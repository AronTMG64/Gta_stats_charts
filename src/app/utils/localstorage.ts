import { MouseEventHandler } from "react";

export type Stats = {
  day: string;
  hours: number;
  income: {
    cayoPericoHeist: number;
    payphoneHit: number;
    drDreContract: number;
  },
  level: number;
};

export function saveStats(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, stats: Stats[]) {
  localStorage.setItem("stats", JSON.stringify(stats));
};