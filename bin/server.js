const mongoose = require("mongoose");
const app = require("../src/app");
require("dotenv").config();

mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI;

const connection = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
