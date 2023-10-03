const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const environment = process.env.ENVIRONMENT || 'development';
const FormMain = require('./Routes/FormMain')
const connectDB = require('./Middleware/mongoose');

connectDB();

app.use(
  cors()
);
app.use(express.json());

app.use('/api/details', FormMain);

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${environment} mode`);
});
