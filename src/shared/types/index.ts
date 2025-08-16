import type { ReactNode } from "react";
import { AArrowDown } from "lucide-react";

export type IconType = typeof AArrowDown;

export interface MainTableColumn<T> {
  key: keyof T;
  label: string;
  format?: (row: T) => ReactNode;
}

export interface MainTableAction {
  icon: IconType;
  type?: "normal" | "delete";
  action: (id: number) => void;
}

export interface QueryParams {
  q: string;
  skip: number;
}
