export interface IToken {
  id: number|null;
  token: string;
  refresh_token?: string;
};