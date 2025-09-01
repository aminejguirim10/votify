# 🗳️ Votify - Modern Voting Platform

Welcome to **Votify**, your comprehensive solution for creating, managing, and participating in democratic voting processes. This full-stack voting platform provides a secure and intuitive environment for vote creators and participants. Whether you're organizing community decisions, team choices, or group consensus, our platform ensures that every vote counts and every voice is heard in a transparent and efficient manner.

## 🔋 Features

👉 **Secure Authentication:** Multi-provider authentication system supporting Google, GitHub, and email/password using NextAuth.js integration.

👉 **Voting Room Management:** Complete voting room lifecycle with creation, joining via unique codes, and real-time participation tracking.

👉 **Vote Creation & Management:** Rich vote creation with optional URLs and comprehensive vote management tools.

👉 **Email Notifications:** Automated email system for welcome messages, password resets, and voting notifications using Nodemailer.

👉 **File Upload:** Integrated media management for user profiles and vote attachments via UploadThing.

👉 **Responsive Design:** Mobile-first approach ensuring optimal experience across all devices and screen sizes.

👉 **Security Features:** Password hashing with bcryptjs, JWT token management, and secure session handling.

## ⚙️ Technologies Used

- **Frontend:** [Next.js 14](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [TypeScript](https://www.typescriptlang.org/)
- **Backend:** Next.js Server Actions and API Routes
- **Database:** [MongoDB](https://www.mongodb.com/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **File Upload:** [UploadThing](https://uploadthing.com/)
- **Email Service:** [Nodemailer](https://nodemailer.com/)

## 🖥️ Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/aminejguirim10/votify.git
```

2. Navigate to the project directory:

```bash
cd votify
```

3. Install the dependencies:

```bash
npm install
```

4. Configure environment variables:

Create a new file named `.env` in the root of your project and add the following content:

```bash
# Database Configuration (MongoDB)
DATABASE_URL="your_mongodb_connection_string"

# NextAuth Configuration
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# GitHub OAuth
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"

# File Upload (UploadThing)
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"

# Email Configuration (Nodemailer)
NODE_MAILER_AUTHOR_MAIL="your_email@gmail.com"
NODE_MAILER_SECRET="your_gmail_app_password"

# JWT Configuration
JWT_SECRET="your_jwt_secret"
```

5. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

6. Start the development server:

```bash
npm run dev
```

7. Open your browser and visit:

```bash
http://localhost:3000
```

## 🗳️ How Votify Works

### For Vote Creators:

1. **Create Voting Rooms:** Set up voting sessions with custom names, descriptions and deadlines
2. **Generate Unique Codes:** Each voting room gets a 6-character code for easy sharing
3. **Add Vote Options:** Create multiple voting choices
4. **Monitor Results:** Track votes and view analytics after deadline

### For Voters:

1. **Join Voting Rooms:** Enter the 6-character code to join any voting session
2. **Cast Your Vote:** Choose from available options before the deadline
3. **View Results:** See live results and popular choices after voting closes
4. **Profile Management:** Manage your profile

## 🚶 Contributing

Contributions are welcome! This project demonstrates modern full-stack development practices:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the existing code style
4. Add appropriate tests and documentation
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request
