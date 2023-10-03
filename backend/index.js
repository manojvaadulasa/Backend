const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const environment = process.env.ENVIRONMENT || 'development';
const FormMain = require('./Routes/FormMain')
const connectDB = require('./Middleware/mongoose');

connectDB();

const allowedOrigins = ['https://www.manojvfullstackexample.in'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/details', FormMain);

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${environment} mode`);
});
