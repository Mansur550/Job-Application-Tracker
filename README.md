# Job Application Tracker

A full-stack job application tracker that helps job seekers save important application details, organize opportunities by stage, and stay prepared when a recruiter calls.

[Live Demo](https://job-application-tracker-rho-silk.vercel.app) · [Source Code](https://github.com/Mansur550/Job-Application-Tracker)

![Job Application Tracker dashboard](./public/hero-images/hero1.png)

## The Problem

Applying for jobs often means using several job boards, company career pages, emails, and application forms. As the number of applications grows, it becomes difficult to remember:

- Which company and position you applied to
- Where you found the job
- What the original job description said
- The salary, location, and required skills
- Notes you made while applying
- Whether the application is waiting, interviewing, accepted, or rejected

When an interview call arrives days or weeks later, the job listing may be unavailable and the application details may already be lost. This makes it harder to prepare for the interview, remember why the role was interesting, and give informed answers to the recruiter.

## The Solution

Job Application Tracker keeps the job search in one place. Each user receives a personal **Job Hunt** board where applications can be saved with their original details and organized across a clear five-stage workflow:

1. **Wish List**
2. **Applied**
3. **Interviewing**
4. **Offer**
5. **Rejected**

Users can create, update, move, and delete applications while keeping the company, position, job link, salary, description, notes, and tags attached to the correct opportunity. This makes it easier to understand the current pipeline, prepare for interviews, and find important details when a recruiter gets in touch.

## What This Project Does

The application gives every registered user a private, visual record of their job search. After signing up, the user gets a ready-to-use board with the five default stages. A job can be added to any stage, updated when new information becomes available, moved through the hiring process from its card menu, or deleted when it is no longer needed.

Instead of searching through old emails, browser history, and multiple job sites, users can return to a single application card to find the original posting link and the notes they saved. Application data persists in MongoDB, so the board remains available across sessions and devices.

## Features

- **Email and password authentication** — Create an account, sign in, maintain a session, and sign out with Better Auth.
- **Automatic board setup** — A personal `Job Hunt` board and five workflow columns are created when a user registers.
- **Kanban-style dashboard** — View the complete application pipeline on one horizontally scrollable board.
- **Detailed application records** — Save the company, position, location, salary, job URL, description, notes, and tags.
- **Progress tracking** — Move an application to another stage from its card menu as its status changes.
- **Application management** — Create, edit, and delete records throughout the job search.
- **Direct job links** — Open the saved job posting from the application card.
- **Custom tags** — Add comma-separated labels such as `React`, `Remote`, or `High Priority`.
- **Ownership checks** — Server Actions verify the active session and record ownership before changing stored data.
- **Persistent storage** — Boards, columns, applications, users, and sessions are stored in MongoDB.
- **Field-level validation feedback** — Invalid account details are caught before an authentication request is submitted.

## Zod Validation

The sign-up and sign-in forms use [Zod](https://zod.dev/) schemas with `safeParse` to validate input and display field-level error messages.

Sign-up validation checks that:

- A name is provided
- The name contains at least two characters
- The name contains only letters and spaces
- An email address is provided in a valid format
- A password is provided with at least eight characters

Sign-in validation checks that:

- The email address is trimmed and has a valid format
- The password contains at least eight characters

Zod is currently used for the authentication forms. Job creation also has HTML required fields and a server-side check for the required company, position, board, and column values.

## How It Works

1. Create an account with a name, email address, and password.
2. Better Auth creates the user and starts an authenticated session.
3. A database hook automatically creates the user's `Job Hunt` board.
4. The board is populated with the five default application stages.
5. Add an opportunity to the stage that matches its current status.
6. Save its job description, URL, salary, notes, and useful tags.
7. Move the application from its card menu as the hiring process progresses.
8. Return to the stored details whenever a recruiter contacts you.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 with App Router |
| UI library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Components | shadcn, Base UI, and Radix Slot |
| Icons | Lucide React |
| Authentication | Better Auth |
| Validation | Zod 4 |
| Database | MongoDB |
| Data modeling | Mongoose |
| Server operations | Next.js Server Actions |
| Deployment | Vercel |

## Architecture

The application uses Next.js for both the user interface and server-side operations:

- **Server Components** load the authenticated dashboard and the user's populated board.
- **Client Components** handle forms, dialogs, menus, validation feedback, and application-card interactions.
- **Server Actions** create, update, move, and delete job applications.
- **Better Auth** manages email/password authentication and sessions through its MongoDB adapter.
- **Mongoose** defines and manages boards, columns, and job-application documents.
- **MongoDB's native driver** supplies the database connection used by Better Auth.
- **Zod** validates authentication form values before submission.

The main data relationship is:

```text
User
└── Job Hunt Board
    ├── Wish List
    ├── Applied
    ├── Interviewing
    ├── Offer
    └── Rejected
        └── Job Applications
```

Each application stores its user, board, and column relationships so that it stays connected to its owner and current workflow stage.

## Getting Started

### Prerequisites

Make sure the following are available:

- Node.js 20.9 or later
- npm
- A local MongoDB database or a MongoDB Atlas cluster

### 1. Clone the repository

```bash
git clone https://github.com/Mansur550/Job-Application-Tracker.git
cd Job-Application-Tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/jobtracker?retryWrites=true&w=majority

BETTER_AUTH_SECRET=<a-secure-random-secret-with-at-least-32-characters>
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

Replace the placeholders with your MongoDB credentials and a secure random authentication secret.

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | Connects application data and authentication storage to MongoDB |
| `BETTER_AUTH_SECRET` | Signs and secures Better Auth data |
| `BETTER_AUTH_URL` | Defines the server-side base URL used by Better Auth |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Defines the authentication base URL used by the browser client |

Do not commit `.env.local` or expose production credentials.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### 5. Create an account

Register through the sign-up page. The application will automatically initialize your personal board and default workflow columns.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Runs the production build |
| `npm run lint` | Checks the project with ESLint |

## Project Structure

```text
Job-Application-Tracker/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/       # Better Auth route handler
│   │   └── test-db/             # MongoDB connection check
│   ├── dashboard/               # Authenticated Job Hunt dashboard
│   ├── sign-in/                 # Sign-in form and Zod schema
│   ├── sign-up/                 # Registration form and Zod schema
│   ├── globals.css              # Tailwind theme and global styles
│   ├── layout.tsx               # Root layout and navigation
│   └── page.tsx                 # Public landing page
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── crate-job-dialog.tsx     # Create-application dialog
│   ├── heroImage.tsx            # Landing-page preview tabs
│   ├── job-application-card.tsx # Card actions and edit dialog
│   ├── kanban-board.tsx         # Board and workflow columns
│   ├── navbar.tsx               # Session-aware navigation
│   └── sign-out-btn.tsx         # Sign-out action
├── lib/
│   ├── actions/                 # Job-application Server Actions
│   ├── auth/                    # Better Auth server and client setup
│   ├── hooks/                   # Client board state
│   ├── models/                  # Board, column, and application models
│   ├── db.ts                    # Cached Mongoose connection
│   ├── init-user-board.ts       # Default board creation
│   ├── mongodb.ts               # Native MongoDB client
│   └── utils.ts                 # Shared utilities
├── public/
│   └── hero-images/             # Product screenshots
├── proxy.ts                     # Session-aware route redirects
└── package.json                 # Dependencies and scripts
```

## Data Stored for Each Application

| Field | Description |
| --- | --- |
| Company | Organization receiving the application |
| Position | Job title or role |
| Location | Office, city, country, or remote location |
| Salary | Expected or advertised compensation |
| Job URL | Link to the original posting |
| Description | A saved summary of the role |
| Notes | Interview preparation or follow-up information |
| Tags | Custom labels for quick context |
| Column | Current application stage |
| Order | Position within its stage |
| User and board IDs | Ownership and board relationships |
| Timestamps | Creation and last-update dates |

## Deployment

The project can be deployed to [Vercel](https://vercel.com/):

1. Import the GitHub repository into Vercel.
2. Add the production environment variables.
3. Set both authentication URL variables to the deployed HTTPS address.
4. Confirm that the MongoDB deployment accepts connections from the hosted application.
5. Deploy the project.

Example production values:

```env
BETTER_AUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-domain.vercel.app
```

## Possible Future Improvements

- Drag-and-drop card movement
- Search, filtering, and sorting
- Follow-up and interview reminders
- Application analytics
- Resume and cover-letter attachments
- Custom boards and workflow columns
- Calendar integration
- Export to CSV or PDF

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Commit the changes with a clear message.
5. Open a pull request describing the improvement.

## Author

Created by [Mansur550](https://github.com/Mansur550).
