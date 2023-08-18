export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export interface UserInfo {
  id: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  country?: string;
  birthday?: string;
  timezone?: string;
  currency?: string;
  is_teacher?: number;
  language?: string;
  user_role?: string;
  is_verified?: number;
  verification_token?: string;
  verification_token_expires_at?: string;
  reset_password_token?: string;
  reset_password_token_expires_at?: string;
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
