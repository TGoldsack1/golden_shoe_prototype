import Router from 'koa-joi-router';
import { baseApi } from '../config';
import ProductController from '../controllers/product';

const { Joi } = Router;

const api = 'public/product';

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
      categoryId: Joi.string().required(),
      price: Joi.number().required(),
      stock: Joi.number().required()
    },
  },
  handler: ProductController.create,
});

router.route({
  method: 'GET',
  path: '/getAll',
  handler: ProductController.getAll,
});

router.route({
  method: 'GET',
  path: '/get',
  handler: ProductController.get,
});

export default router;