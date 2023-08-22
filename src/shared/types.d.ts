export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export type DropdownMenuProps = {
  title: string;
  items: FilterData[];
};
export interface FilterData {
  key: string;
  label: string;
  value: string;
  type: string;
}

export interface CurrencyInfo {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

export interface CurrencyData {
  [key: string]: CurrencyInfo;
}

export interface Category {
  id: number;
  label: string;
}

export enum LessonType {
  "MIN30" = "60min",
  "MIN60" = "30min",
  "MIXED" = "Mixed",
}
