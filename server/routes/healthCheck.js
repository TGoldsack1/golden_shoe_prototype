import Router from 'koa-joi-router';
import { baseApi } from '../config';
import HealthCheckController from '../controllers/healthCheck';

const api = 'healthCheck';

const router = Router();

router.prefix(`/${baseApi}/public/${api}`);

// GET /api/healthcheck
// returns 200 if API is up and runnign
router.route({
  method: 'GET',
  path: '/',
  handler: HealthCheckController.getServerHealth,
});

export default router;
