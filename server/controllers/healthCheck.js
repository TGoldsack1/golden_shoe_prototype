/**
 * Get server health
 * @param {ctx} Koa Context
 */
const getServerHealth = ctx => {
  ctx.body = 'hello world from the server';
};

export default {
  getServerHealth,
};
