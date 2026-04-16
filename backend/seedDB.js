const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("./models/user.model");
require("dotenv").config();

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    // Check if test user already exists
    const existingUser = await User.findOne({ email: "test@example.com" });
    if (existingUser) {
      console.log("Test user already exists!");
      await mongoose.disconnect();
      return;
    }

    // Create a test user
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash("test1234", saltRounds);
    
    const testUser = new User({
      name: "Test User",
      email: "test@example.com",
      passwordHash,
      role: "USER"
    });

    await testUser.save();
    console.log("✅ Test user created successfully!");
    console.log("Email: test@example.com");
    console.log("Password: test1234");

    await mongoose.disconnect();
    console.log("Database connection closed");
  } catch (err) {
    console.error("Error seeding database:", err.message);
    process.exit(1);
  }
};

seedDB();
