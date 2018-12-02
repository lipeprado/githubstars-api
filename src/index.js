import express from 'express';
import config from 'config';
import basicLogger from 'basic-logger';
import middlewaresConfig from './config/middlewares';

global.log = new basicLogger({ showTimestamp: true });
const logger = new basicLogger({ showTimestamp: true });

import ApiRoutes from './routes';

const app = express();

// Wrap all the middlewares with the server
middlewaresConfig(app);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use('/api/v1', ApiRoutes);

try {
  const { PORT } = config.get(process.env.NODE_ENV);
  app.listen(PORT);
  logger.info(`App listening at port ${PORT}  🦄`);
} catch (e) {
  logger.error(e);
  throw e;
}
