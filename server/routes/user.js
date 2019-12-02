import Router from 'koa-joi-router';
import { baseApi } from '../config';
import UserController from '../controllers/user';

const { Joi } = Router;

const api = 'public/user';

const router = Router();

router.prefix(`/${baseApi}/${api}`);

router.route({
  method: 'POST',
  path: '/clearBasket',
  validate: {
    type: 'json',
    body: {
      userId: Joi.string().required(),
    },
  },
  handler: UserController.clearBasket,
});

router.route({
  method: 'POST',
  path: '/checkout',
  validate: {
    type: 'json',
    body: {
      userId: Joi.string().required(),
    },
  },
  handler: UserController.checkout,
});

router.route({
  method: 'POST',
  path: '/addToBasket',
  validate: {
    type: 'json',
    body: {
      userId: Joi.string().required(),
      productId: Joi.string().required(),
    },
  },
  handler: UserController.addToBasket,
});

router.route({
  method: 'POST',
  path: '/removeFromBasket',
  validate: {
    type: 'json',
    body: {
      userId: Joi.string().required(),
      productId: Joi.string().required(),
    },
  },
  handler: UserController.removeFromBasket,
});

router.route({
  method: 'GET',
  path: '/getBasketTotal',
  handler: UserController.getBasketTotal,
});

export default router;