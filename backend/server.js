require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer"); 

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Increase the payload size limit
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For form submissions

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));


// Define auth user schema with authProvider field
const AuthUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  authProvider: {
    type: String,
    default: 'local' // 'local', 'google', etc.
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define Consultant schema
const ConsultantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  profession: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String, // Store as base64 string
    required: false
  },
  skills: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const AuthUser = mongoose.model("AuthUser", AuthUserSchema);
const Consultant = mongoose.model("Consultant", ConsultantSchema);

// For production, replace setupEmailTransporter with this:
const setupProductionTransporter = () => {
  // Ensure we have credentials
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error('Email credentials are missing in .env file');
    return null;
  }

  console.log('Setting up email transport with user:', process.env.EMAIL_USER);
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    },
    debug: true, // Enable debug logs
    logger: true  // Log information to the console
  });
  
  return { transporter };
};

// Improved function to send confirmation email
const sendConsultantRegistrationEmail = async (name, email) => {
  try {
    // Set up the email transporter
    const emailService = await setupProductionTransporter();
    
    if (!emailService) {
      throw new Error('Email transporter could not be set up');
    }
    
    const { transporter } = emailService;
    
    const mailOptions = {
      from: `"Consulting Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Our Consultant Network!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #3b82f6;">Welcome to Our Consultant Network!</h1>
          </div>
          
          <div style="margin-bottom: 30px;">
            <p>Hello <strong>${name}</strong>,</p>
            <p>Thank you for registering as a consultant on our platform. We're excited to have you join our community of professionals!</p>
            <p>Your registration has been successfully received and is now being reviewed by our team. You will be notified once your profile is approved and visible to clients.</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #3b82f6; font-size: 18px;">What's Next?</h2>
            <ul>
              <li>Our team will review your profile information</li>
              <li>Once approved, your profile will be visible to potential clients</li>
              <li>You can update your profile information anytime by logging in</li>
              <li>Start receiving consultation requests and grow your network!</li>
            </ul>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>If you have any questions or need assistance, please don't hesitate to <a href="mailto:support@yourconsultingplatform.com" style="color: #3b82f6;">contact our support team</a>.</p>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e1e1e1; color: #6b7280; font-size: 14px;">
            <p>© ${new Date().getFullYear()} Your Consulting Platform. All rights reserved.</p>
          </div>
        </div>
      `
    };

    console.log('Attempting to send email to:', email);
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`Email sent successfully to ${email}`);
    console.log('Message ID:', info.messageId);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// API Routes
app.get("/", (req, res) => res.send("Server is running"));

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// User Registration Route
app.post("/register", async (req, res) => {
  try {
    console.log('Registration attempt with:', req.body);
    const { name, email, password } = req.body;
    
    // Check if all required fields are provided
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Check if user already exists
    const existingUser = await AuthUser.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: "User already exists" });
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = new AuthUser({
      name,
      email,
      password: hashedPassword
    });
    
    await newUser.save();
    console.log('User created successfully:', newUser._id);
    
    // Return user without password
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email
    };
    
    res.status(201).json({ 
      success: true, 
      message: "User registered successfully",
      user: userResponse
    });
  } catch (error) {
    console.error("Registration error details:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    console.log('Login attempt with:', req.body.email);
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Find user by email
    const user = await AuthUser.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Create user response without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    
    console.log('Login successful for:', email);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
  }
});

// Logout Route
app.post("/logout", (req, res) => {
  try {
    const { email } = req.body;
    console.log(`User logged out: ${email}`);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Consultant Registration Route
app.post("/consultant-registration", async (req, res) => {
  try {
    console.log('Consultant registration attempt:', req.body);
    const { name, email, phone, profession, experience, location, country, profilePhoto, skills, rating, reviewCount } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !profession || !experience || !location || !country) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (!skills || skills.length === 0) {
      return res.status(400).json({ message: "At least one skill is required" });
    }

    // Create new consultant
    const newConsultant = new Consultant({
      name,
      email,
      phone,
      profession,
      experience,
      location,
      country,
      profilePhoto,
      skills,
      rating: parseFloat(rating) || 0,
      reviewCount: parseInt(reviewCount) || 0
    });

    await newConsultant.save();
    console.log('Consultant registered successfully:', newConsultant._id);

    // Send confirmation email
    let emailResult = { success: false, error: 'Email sending was not attempted' };
    
    try {
      emailResult = await sendConsultantRegistrationEmail(name, email);
      
      if (emailResult.success) {
        console.log(`Confirmation email sent to ${email}`);
      } else {
        console.warn(`Failed to send confirmation email to ${email}: ${emailResult.error}`);
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      emailResult = { success: false, error: emailError.message };
    }

    // Respond with success message regardless of email status
    res.status(201).json({
      success: true,
      message: "Consultant registered successfully",
      consultant: newConsultant,
      emailStatus: emailResult.success ? 'sent' : 'failed',
      emailError: emailResult.error || null
    });
  } catch (error) {
    console.error("Consultant registration error:", error.stack);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// Add this route to fetch all consultants
app.get("/consultants", async (req, res) => {
  try {
    const consultants = await Consultant.find();
    res.status(200).json(consultants);
  } catch (error) {
    console.error("Error fetching consultants:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// OAuth User Registration Route (for users who sign up with Google, etc.)
app.post("/register-oauth-user", async (req, res) => {
  try {
    console.log('OAuth user registration:', req.body);
    const { userId, name, email, authProvider } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: "Email is required for OAuth registration" 
      });
    }
    
    // Check if user already exists in your system
    const existingUser = await AuthUser.findOne({ email });
    
    if (existingUser) {
      // User exists, update their auth provider info if needed
      console.log('OAuth user already exists:', email);
      
      // Update authProvider if it's not set or different
      if (!existingUser.authProvider || existingUser.authProvider !== authProvider) {
        await AuthUser.updateOne(
          { _id: existingUser._id },
          { $set: { authProvider } }
        );
        console.log('Updated auth provider for existing user:', email);
      }
      
      return res.status(200).json({ 
        success: true,
        message: "User authenticated successfully", 
        user: {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          authProvider: authProvider
        }
      });
    }
    
    // Create a new user for OAuth providers
    // Generate a secure random password for OAuth users
    const securePassword = `oauth_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(securePassword, salt);
    
    const newUser = new AuthUser({
      name,
      email,
      password: hashedPassword,
      authProvider
    });
    
    await newUser.save();
    console.log('OAuth user created successfully:', newUser._id);
    
    res.status(201).json({ 
      success: true, 
      message: "OAuth user registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        authProvider: authProvider
      }
    });
  } catch (error) {
    console.error("OAuth registration error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));