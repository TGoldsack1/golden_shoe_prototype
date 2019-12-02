import Router from 'koa-joi-router';
import { baseApi } from '../config';
import DiscountController from '../controllers/discount';

const { Joi } = Router;

const api = 'public/discount';

const router = Router();

router.prefix(`/${baseApi}/${api}`);

router.route({
  method: 'GET',
  path: '/getAll',
  handler: DiscountController.getAll,
});


router.route({
  method: 'POST',
  path: '/send',
  handler: DiscountController.sendDiscountCode,
});

export default router;