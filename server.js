require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import router
const routes = require('./routes/router');
// Use Routes
app.use('/', routes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conected to DB'))
  .catch((error) => (console.error(error)));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
