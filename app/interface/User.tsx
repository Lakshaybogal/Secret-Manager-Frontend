export interface User {
  id: string;
  email: string;
  username: string;
  firstname: string;
}

export interface RegisterUser {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  contact: string;
}
