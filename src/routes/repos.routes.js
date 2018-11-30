/**
 * User Routes
 */

import express from 'express';

import * as ReposController from '../controllers/repos.controller';

const routes = express.Router();
routes.post('/', ReposController.index);
routes.get('/:username', ReposController.getByUsername);

export default routes;
