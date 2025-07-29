Online Consultation PlatformAn online consultation platform built with the MERN stack (MongoDB, Express.js, React, Node.js) that connects users with expert consultants for video-based consultations. This platform facilitates seamless appointment booking, secure user authentication, and a personalized dashboard experience.Table of ContentsFeaturesTech StackInstallationPrerequisitesBackend SetupFrontend SetupUsageProject StructureContributingLicenseContactFeaturesThis platform offers a robust set of features for both users and consultants:User FeaturesSecure Authentication:Register and log in using email and password.Authenticate via Google Sign-in/Sign-up (OAuth)."Remember me" option for persistent sessions.Consultant Browsing:View a comprehensive list of available consultants.Filter consultants by specialty (e.g., Health Care, Business, Finance).Search for specific consultants by name or profession.Appointment Management:Book appointments with selected consultants, specifying date, time, and a consultation message.View all upcoming and past appointments on a personalized dashboard.Reschedule or cancel upcoming appointments.Provide feedback and ratings for completed sessions.Dashboard Overview:Summary cards for upcoming, completed, and engaged consultant sessions.Detailed view of each appointment.Consultant FeaturesRegistration:Register as a consultant, providing personal details, profession, experience, location, and skills.Upload an optional profile photo.Receive a confirmation email upon successful registration.General FeaturesResponsive Design: Optimized for various screen sizes (mobile, tablet, desktop).Theme Toggling: Switch between light and dark themes, with preference saved locally.Interactive UI: Dynamic search, password visibility toggle, and animated elements.Tech StackThe project is built using the following technologies:Frontend:React.jsReact Router DOM for navigationCSS Modules for stylinglucide-react for iconsTesting: @testing-library/jest-dom, @testing-library/react, @testing-library/user-eventBackend:Node.jsExpress.jsMongoDB (with Mongoose ODM)bcrypt for password hashingcors for cross-origin resource sharingdotenv for environment variablesnodemailer for email services@nhost/nhost-js for simplified authentication integration (if using Nhost backend)InstallationFollow these steps to set up and run the project locally.PrerequisitesNode.js (LTS version recommended)npm (Node Package Manager) or YarnMongoDB (running locally or a cloud instance like MongoDB Atlas)Backend SetupNavigate to the backend directory:cd backend
Install dependencies:npm install
# OR
yarn install
Create a .env file:In the backend directory, create a file named .env and add the following environment variables. Replace the placeholder values with your actual credentials.PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
NHOST_SUBDOMAIN=your_nhost_subdomain # Only if using Nhost for authentication
NHOST_REGION=your_nhost_region # Only if using Nhost for authentication
MONGO_URI: Your MongoDB connection string (e.g., mongodb://localhost:27017/onlineconsultation or your Atlas connection string).JWT_SECRET: A strong, random string for JWT token signing.EMAIL_USER and EMAIL_PASS: Credentials for sending confirmation emails (e.g., Gmail, SendGrid).NHOST_SUBDOMAIN, NHOST_REGION: Required if you are leveraging Nhost for authentication.Start the backend server:npm start
# OR
yarn start
The backend server will typically run on http://localhost:5000 (or the PORT you specified).Frontend SetupNavigate to the frontend directory:cd frontend
Install dependencies:npm install
# OR
yarn install
Start the frontend development server:npm start
# OR
yarn start
The frontend application will typically open in your browser at http://localhost:3000.UsageOnce both the backend and frontend servers are running:Register/Login:Open your browser to http://localhost:3000.Sign up as a new user or log in with existing credentials. You can also use the "Sign in with Google" option.Explore Consultants:Navigate to the "Consultants" page to browse available professionals.Use the search bar and filters to find specific consultants.Book an Appointment:Click on a consultant to view their profile and initiate a booking.Select a date and time, and add a message for the consultant.Manage Appointments:Go to your "Dashboard" to view your upcoming and past appointments.Reschedule or cancel appointments as needed.Provide feedback for completed sessions.Project StructureThe project is divided into backend and frontend directories:online-consultation-platform/
├── backend/
│   ├── node_modules/
│   ├── app.js                 # Main Express app configuration
│   ├── server.js              # Server entry point
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example           # Example environment variables
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html         # Main HTML file
│   │   └── ...
│   ├── src/
│   │   ├── App.js             # Main React application component
│   │   ├── index.js           # React entry point
│   │   ├── assets/            # Static assets (images, styles)
│   │   │   ├── images/
│   │   │   └── styles/
│   │   ├── components/        # Reusable React components (Navbar, Footer, ProtectedRoute)
│   │   ├── pages/             # React components for different routes (Login, Signup, Dashboard, etc.)
│   │   └── ...
│   ├── package.json
│   ├── package-lock.json
│   └── .env.example           # Example environment variables for frontend
└── .gitignore
ContributingContributions are welcome! If you'd like to contribute, please follow these steps:Fork the repository.Create a new branch (git checkout -b feature/your-feature-name).Make your changes.Commit your changes (git commit -m 'Add new feature').Push to the branch (git push origin feature/your-feature-name).Open a Pull Request.LicenseThis project is licensed under the MIT License. See the LICENSE file for details.ContactFor any questions or inquiries, please contact [Samuel Srujan B/samuelsrujanb@gmail.com].
