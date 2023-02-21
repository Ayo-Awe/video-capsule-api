export enum EmailTemplate {
  Confirmation = "confirmation",
  Login = "login",
  Signup = "signup",
  Subscription = "subscription",
  Unlock = "unlock",
}

export type EmailOptions = {
  to: string;
  subject: string;
  context: object;
};
