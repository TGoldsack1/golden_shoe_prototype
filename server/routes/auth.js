import Router from 'koa-joi-router';
import { baseApi } from '../config';
import UserController from '../controllers/auth';

const { Joi } = Router;

const api = 'public/authentication';

const router = Router();

router.prefix(`/${baseApi}/${api}`);

router.route({
  method: 'POST',
  path: '/register',
  validate: {
    type: 'json',
    body: {
      forenames: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string()
        .lowercase()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(100)
        .required(),
    },
  },
  handler: UserController.register,
});

router.route({
  method: 'POST',
  path: '/login',
  handler: UserController.login,
});

export default router;