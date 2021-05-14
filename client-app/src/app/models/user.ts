export interface User {
  username: string;
  displayName: string;
  token: String;
  image?: String;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName?: string;
}
