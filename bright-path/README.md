# BrightPath - Study Abroad Platform
BrightPath is a comprehensive web application designed to simplify the study abroad journey for students. It connects prospective international students with educational opportunities worldwide, providing guidance through every step of the application process.

## Overview
BrightPath serves as a bridge between students seeking international education and universities around the globe. The platform offers destination exploration, program matching, application management, and personalized guidance.

## Features

### Public Features
- **Destination Discovery:** Explore study destinations across continents with detailed information about universities, programs, and living conditions
- **Program Search:** Find academic programs matching student interests and qualifications
- **Application Guidance:** Step-by-step assistance through the application process
- **AI Assistant:** Get instant answers to questions about studying abroad
- **User Authentication:** Secure registration and login functionality

### Student Dashboard
- **Application Tracking:** Monitor application status in real-time
- **Document Management:** Upload and organize required documents
- **Personalized Recommendations:** Receive tailored suggestions based on profile and interests

### Admin Dashboard
- **Comprehensive Overview:** View key metrics about platform activity
- **User Management:** Monitor and manage student accounts
- **Destination Management:** Add, edit, and customize study abroad destinations
- **Analytics:** Track platform usage and application statistics

## Technical Stack
- **Frontend:** React with TypeScript
- **Styling:** Tailwind CSS with ShadcnUI components
- **State Management:** React Context API
- **Authentication:** Firebase Authentication
- **Database:** Firestore
- **Routing:** React Router v6
- **Forms:** React Hook Form with Zod validation
- **Animation:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
   ```
   git clone https://github.com/ikbalkahhori/bright-path.git
   cd bright-path
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Configure environment variables
   - Create a `.env` file in the root directory
   - Add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server
   ```
   npm run dev
   ```

### Firebase Setup
1. Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication with Email/Password method
3. Create a Firestore database
4. Set up Firestore security rules

## Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── admin/          # Admin interface components
│   └── ui/             # ShadcnUI components
├── contexts/           # React context providers
├── pages/              # Page components
│   └── admin/          # Admin page components
├── services/           # API and Firebase services
│   └── seeds/          # Data seeding utilities
├── types/              # TypeScript type definitions
└── schemas/            # Zod validation schemas
```

## Authentication and Authorization
BrightPath implements role-based access control:
- **Public users:** Can view general information and register
- **Students:** Can access their dashboard and manage applications
- **Admins:** Have full access to the admin dashboard with management capabilities