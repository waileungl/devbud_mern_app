// Import mongoose to build the model
const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: [true, 'First name must be at least 2 charachters long.'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name must be at least 2 charachters long.'],
    },
    education: {
      type: String,
      required: false,
    },
    yearsOfExp: {
      type: Number,
      required: [true, 'Please provide years of experience.'],
    },
    bio: {
      type: String,
      required: [
        true,
        'Please provide a brief description of your background.',
      ],
    },
    javaScript: {
      type: Boolean,
      default: false,
    },
    python: {
      type: Boolean,
      default: false,
    },
    java: {
      type: Boolean,
      default: false,
    },
    cSharp: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// This creates the model - used to make the actual queries to the DB.
const Dev = mongoose.model('Dev', DevSchema);

// EXPORT the model
module.exports = Dev;
