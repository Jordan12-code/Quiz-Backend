const { env, port } = require('./core/config');
const logger = require('./core/logger')('app');
const server = require('./core/server');

const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = `${process.env.DB_CONNECTION}/${process.env.DB_NAME}`;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB ✅');
  })
  .catch((err) => {
    console.error('MongoDB connection error ❌:', err);
  });

const app = server.listen(port, (err) => {
  if (err) {
    logger.fatal(err, 'Failed to start the server.');
    process.exit(1);
  } else {
    logger.info(`Server runs at port ${port} in ${env} environment`);
  }
});

process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught exception.');

  // Shutdown the server gracefully
  app.close(() => process.exit(1));

  // If a graceful shutdown is not achieved after 1 second,
  // shut down the process completely
  setTimeout(() => process.abort(), 1000).unref();
  process.exit(1);
});
