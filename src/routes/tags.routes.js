/**
 * User Routes
 */

import express from 'express';

import * as TagsController from '../controllers/tags.controller';

const routes = express.Router();
routes.post('/:repoId', TagsController.index);
routes.get('/:repoId', TagsController.getTagsByRepoId);

export default routes;
