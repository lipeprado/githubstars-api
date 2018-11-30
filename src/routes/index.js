import express from 'express';
import HTTPStatus from 'http-status';

// Middlewares
import APIError from '../services/Error';
import logErrorService from '../services/Log';

// Controllers
import reposRoutes from './repos.routes';
import tagsRoutes from './tags.routes';

const routes = express.Router();
routes.use('/repos', reposRoutes);
routes.use('/tags', tagsRoutes);

routes.all('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);

routes.use(logErrorService);

export default routes;
