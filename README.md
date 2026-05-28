# FitLog

A minimalist, high-performance fitness tracking application designed to help you monitor workouts, track progress, and reach your goals. Built with a focus on clean UI and seamless data management.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (Strict mode)
- **Database & Auth:** Supabase (PostgreSQL)
- **ORM:** Prisma 6
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Visualization:** MUI X Charts

## 🏗️ Architecture

FitLog uses a modern server-side architecture to ensure performance and security:
- **Server Actions:** Used for all business logic and mutations.
- **Data Layer:** Prisma handles ORM operations, with custom middleware for secure routing.
- **Proxying:** Sensitive API keys (RapidAPI for exercise data) are proxied via server-side route handlers to prevent leakage.

## 📊 Features

- **Workout Tracking:** Log sets, reps, weight, and volume effortlessly.
- **Progress Insights:** Visual dashboard with detailed performance analytics.
- **Minimalist Design:** Mobile-first approach with a focus on dark-mode aesthetics.
- **Customizable:** Settings for light/dark mode and user preferences.
