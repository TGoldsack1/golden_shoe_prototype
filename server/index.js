import Koa from 'koa';

import { port } from './config';
import routing from './routes';


// mongoose.connect(devConnectionStr, { useNewUrlParser: true });
// mongoose.connection.on('error', console.error);

const app = new Koa();

app.on('error', (err, ctx) => {
  console.error(err);
});

// app.use(
//   jwt({
//     secret: SECRET,
//   }).unless({
//     path: [/.*api\/public.*/, '/'],
//   }),
// );

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', 'true');
  //ctx.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  await next();
});

routing(app);

app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`),
);

export default app;
