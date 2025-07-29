# Online Consultation Platform

An online consultation platform built with the **MERN stack (MongoDB, Express.js, React, Node.js)** that connects users with expert consultants for video-based consultations. This platform facilitates seamless appointment booking, secure user authentication, and a personalized dashboard experience.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

This platform offers a robust set of features for both users and consultants:

### User Features

#### Secure Authentication:
- Register and log in using email and password.
- Authenticate via Google Sign-in/Sign-up (OAuth).
- "Remember me" option for persistent sessions.

#### Consultant Browsing:
- View a comprehensive list of available consultants.
- Filter consultants by specialty (e.g., Health Care, Business, Finance).
- Search for specific consultants by name or profession.

#### Appointment Management:
- Book appointments with selected consultants, specifying date, time, and a consultation message.
- View all upcoming and past appointments on a personalized dashboard.
- Reschedule or cancel upcoming appointments.
- Provide feedback and ratings for completed sessions.

#### Dashboard Overview:
- Summary cards for upcoming, completed, and engaged consultant sessions.
- Detailed view of each appointment.

### Consultant Features

#### Registration:
- Register as a consultant, providing personal details, profession, experience, location, and skills.
- Upload an optional profile photo.
- Receive a confirmation email upon successful registration.

### General Features

- **Responsive Design**: Optimized for various screen sizes (mobile, tablet, desktop).
- **Theme Toggling**: Switch between light and dark themes, with preference saved locally.
- **Interactive UI**: Dynamic search, password visibility toggle, and animated elements.

---

## Tech Stack

The project is built using the following technologies:

### Frontend:
- React.js
- React Router DOM
- CSS Modules
- `lucide-react` (icons)
- Testing: `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- `bcrypt` for password hashing
- `cors` for cross-origin resource sharing
- `dotenv` for environment variables
- `nodemailer` for email services
- `@nhost/nhost-js` (if using Nhost authentication)

---

## Installation

### Prerequisites
- Node.js (LTS version recommended)
- npm or Yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

---

### Backend Setup

```bash
cd backend
