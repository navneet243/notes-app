const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./Routes/userRoutes");
const noteRouter = require("./Routes/noteRoutes");
require("dotenv").config();
const path = require("path")

const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());


//Routes
app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

// database connection
const dbURI = process.env.MONGODB_URL;
mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("db connected");
  }
);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client' , 'build' ,'index.html'))
  })
}

//listen server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running at", PORT);
});
