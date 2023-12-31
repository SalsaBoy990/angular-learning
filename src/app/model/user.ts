export class User {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  role?: number;
  token?: string | null;
  [key: string]: any;
}
