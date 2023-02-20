export enum EmailTemplate {
  Confirmation = "confirmation",
  Login = "login",
  Signup = "signup",
  Subscription = "subscription",
  Unlock = "unlock",
}

export type EmailOptions<T extends {}> = {
  to: string;
  context: T;
};
