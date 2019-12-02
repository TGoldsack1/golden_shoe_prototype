import Router from 'koa-joi-router';
import { baseApi } from '../config';
import CategoryController from '../controllers/category';

const { Joi } = Router;

const api = 'public/category';

const router = Router();

router.prefix(`/${baseApi}/${api}`);

router.route({
  method: 'POST',
  path: '/create',
  validate: {
    type: 'json',
    body: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  },
  handler: CategoryController.create,
});

router.route({
  method: 'GET',
  path: '/getAll',
  handler: CategoryController.getAll,
});

export default router;