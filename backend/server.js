require("dotenv").config();   // 1️⃣ load env FIRST

const connectDB = require("./src/config/db");
const app = require("./src/app");

connectDB();                  // 2️⃣ then connect DB

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
