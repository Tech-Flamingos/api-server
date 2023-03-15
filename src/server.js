'use strict';

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3002;

const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const logger = require('./middleware/logger.js');

const authRoutes = require('./auth/routes');
const routes = require('./auth/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(authRoutes);
app.use(routes);

app.use(notFound);
app.use(errorHandler);

mongoose.set('strictQuery', true);
async function connectToMongoDB() {
  try {
    await console.log(`Connected to MongoDB`);
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
  } catch (error) {
    console.error(error);
  }
}

connectToMongoDB();

function start() {
  app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
}
module.exports = { start, app, connectToMongoDB };
