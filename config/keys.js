module.exports = {
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost/Pets",
  secretOrKey: process.env.MONGODB_SECRET || "secret"
};
