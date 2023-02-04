export enum EmailTemplate {
  Confirmation = "confirmation",
  Auth = "auth",
  Subscription = "subscription",
  Unlock = "unlock",
}

export interface EmailOptions {
  to: string;
  context: object;
}
