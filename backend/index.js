const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 6000;
const FormMain = require('./Routes/FormMain');
const connectDB = require('./Middleware/mongoose');
const helmet = require("helmet");
connectDB();

app.use(cors(
  {
    origin: ["https://manojvfullstackexample.in"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }
));
app.use(express.json());

app.use(helmet());
function verifyAPI(req,res,next){
  const providedKey = req.headers["ManojAPIKey"];
  if(!providedKey || providedKey!== process.env.API_KEY){
    return res.status(401).json({message: "Unauthorized access"});
  }
  next();
}
app.get("/", (req, res) => {
  res.json("Hello");
})
app.use('/api/details',verifyAPI, FormMain);

app.listen(port, () => {
  console.log("Server is Running")
})