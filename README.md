# Nexus: AI Mock Interviews Platform

## Overview

Nexus is a modern web application designed to help users prepare for technical interviews through realistic, AI-powered mock interview sessions. The platform offers both automated and manual interview creation, real-time feedback, and a personalized dashboard to track progress and results.

## Features

- **User Authentication:** Secure sign-up, sign-in, password reset, and session management using Firebase Auth.
- **Dashboard:** Centralized hub for users to view analytics, create interviews, access feedback, and manage their interview history.
- **Interview Generation:**
  - **Manual:** Users can create custom interviews by specifying details via a form.
  - **Automated (VAPI):** Instantly generate interviews using AI APIs.
- **Interview Management:**
  - View all interviews in a modern, filterable table.
  - Status indicators for completed and pending interviews.
  - Start interviews directly from the dashboard.
  - Access feedback for completed interviews.
- **Feedback System:**
  - Real-time feedback after each interview session.
  - Feedback-driven status updates in the dashboard.
- **Responsive UI:**
  - Built with Next.js App Router and React.
  - Modern, accessible design using CSS Modules.
- **Integration:**
  - Firebase Firestore for data storage.
  - Modular component structure for easy maintenance and scalability.

## System Architecture

Nexus is built using a modular, scalable architecture that leverages modern web technologies and cloud services for reliability, security, and performance.

### High-Level Architecture Diagram

```
graph TD
    A[User Browser] -->|HTTPS| B[Next.js (Nexus) Frontend]
    B -->|API Calls| C[Next.js API Routes]
    C -->|Auth, Data| D[Firebase Auth & Firestore]
    C -->|AI Interview Generation| E[VAPI/AI Service]
    D <--> F[Firebase Admin SDK]
    B -->|Static Assets| G[Public CDN]
```

### Components

- **Frontend (Next.js/React):**
  - Renders all user interfaces, handles routing, and manages client-side state.
  - Communicates with backend API routes for data and actions.
- **API Layer (Next.js API Routes):**
  - Handles authentication, interview creation, feedback submission, and data retrieval.
  - Secures endpoints and validates user permissions.
- **Authentication (Firebase Auth):**
  - Manages user sign-up, sign-in, password reset, and session validation.
- **Database (Firestore):**
  - Stores user profiles, interviews, feedback, and analytics data.
  - Real-time updates for dashboard and interview status.
- **Admin SDK (Firebase Admin):**
  - Used for privileged server-side operations (e.g., verifying tokens, managing users).
- **AI/Interview Generation (VAPI/AI Service):**
  - Integrates with external AI APIs to generate interview questions and simulate interviewers.
- **Static Assets (CDN/Public):**
  - Hosts images, stylesheets, and other static resources for fast delivery.

### Data Flow

1. **User Authentication:**
   - User signs up or logs in via the frontend, which communicates with Firebase Auth.
2. **Interview Creation:**
   - User initiates interview creation (manual or AI-powered) from the dashboard.
   - API route validates the request, stores interview data in Firestore, and triggers AI generation if needed.
3. **Interview Management:**
   - Dashboard fetches interview data from Firestore in real time.
   - Status and feedback are updated as interviews are completed.
4. **Feedback:**
   - After an interview, feedback is submitted and stored in Firestore.
   - Dashboard updates to reflect completion status.

### Security & Best Practices

- All API routes are protected and validate user authentication tokens.
- Firestore security rules restrict data access to authenticated users only.
- Sensitive operations use the Firebase Admin SDK on the server side.
- Environment variables are used for all secrets and API keys.

## Project Structure

```
├── app/
│   ├── (auth)/           # Authentication pages (sign-in, sign-up, reset, etc.)
│   ├── (root)/           # Main dashboard, interview, and resume pages
│   ├── about/            # About page
│   ├── api/              # API routes (e.g., VAPI integration)
│   ├── globals.css       # Global styles
│   └── ...
├── components/
│   ├── dashboard/        # Dashboard layout, sidebar, content, and sections
│   ├── landing/          # Landing page components
│   ├── ui/               # Reusable UI components (button, form, input, etc.)
│   └── ...
├── constants/            # App-wide constants
├── firebase/             # Firebase client and admin setup
├── lib/                  # Utility and helper functions
├── public/               # Static assets
├── types/                # TypeScript type definitions
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Firebase project (for Auth and Firestore)

### Installation

1. **Clone the repository:**

```sh
git clone <repo-url>
cd nexus
```

2. **Install dependencies:**

```sh
npm install
# or
yarn install
```

3. **Configure Firebase:**

- Add your Firebase credentials to the environment variables or config files as required in `firebase/client.ts` and `firebase/admin.ts`.
- Update `firebase.json` as needed.

4. **Run the development server:**

```sh
npm run dev
# or
yarn dev
```

5. **Open the app:**

- Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Sign up or log in** to access your Nexus dashboard.
- **Create interviews** via the dashboard (manual or automated).
- **Start interviews** and receive real-time feedback.
- **Track your progress** and review feedback in the "My Interviews" section.

## Technologies Used

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Firebase (Auth, Firestore, Admin SDK)**
- **CSS Modules**
- **Lucide React** (icons)

## Folder Details

- `app/`: Routing, layouts, and main pages.
- `components/`: UI and dashboard components.
- `constants/`: Application-wide constants.
- `firebase/`: Firebase configuration and utilities.
- `lib/`: Helper functions and utilities.
- `public/`: Static files and images.
- `types/`: TypeScript type definitions.

## Contributing

Contributions to Nexus are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

## License

This project is licensed under the MIT License.

## Contact

For questions, support, or feature requests, please open an issue or contact the maintainer.
