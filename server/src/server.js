// Name: Ulukbek Aitmatov
// email: ulukbek.aitmatov@stonybrook.edu
// Name: Chanju Lee
// email: chanju.lee@stonybrook.edu

require("dotenv").config();
const db = require("./config/db");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

const corsOption = {
  origin: "http://localhost:3001",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));

app.use("/login", require("./routes/studentRoutes"));
app.use("/courses", require("./routes/courseRoutes"));
app.use("/transcript", require("./routes/transcriptRoutes"));
app.use("/prerequisites", require("./routes/prerequisiteRoutes"));
app.use("/register", require("./routes/registerRoutes"));

// Global Error Handler.
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went wrong on Backend Side",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
