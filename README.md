## TODO

- [x] Setup AWS S3 bucket
- [x] Connect Multer to S3 bucket
- [ ] Create Email Service and Email Queue
- [ ] Implement Email only signup and login
- [ ] Create Capsule Service
- [ ] Create Confirmation Email
- [ ] Create Subscription Email
- [ ] Create Capsule Unlock Email
- [ ] Create Schedule Service

## Milestones

### Setup Multer and AWS config

- Setup AWS S3 bucket
- Connect Multer to S3 bucket

### Setup Email Service and Email Queue

- Implement logic for sending emails
  - Bull mq
  - Nodemailer
  - Email templates
- Design email templates for
  - Capsule subscription emails
  - Unlock emails
  - Confirmation
  - Login/Signup

### Implement email-only user Login & Signup

- Create auth routes
  - Login
  - Signup
- Implement an auth middleware with jwts
- Login and Signup routes should email user with a login link, the only difference between them is an extra query parameter denoting that this user is a new signup
- Token will be stored in local storage and sent on each request

### Setup Capsule Service

- CRUD for capsule service

- Implement logic for storing capsule data in the database

Capsule Schema

- email: string
- s3Key: string
- caption: string
- subscribers: [{ email: string, isConfirmed: bool }]
- createdAt: Date
- unlockDate: Date
- userID: userRef

### Implement Token Service

- Create Token
- Delete Token
- Verify Token

### Setup Schedule Service

- Implement logic for scheduling the delivery of capsules

Possible project rename, VidMe
