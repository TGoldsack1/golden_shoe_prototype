import Koa from 'koa';
import mongoose from 'mongoose';
import logger from 'koa-logger';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { port, connectionString } from './config';
import routing from './routes';

mongoose.connect(connectionString, { useNewUrlParser: true });
mongoose.connection.on('error', console.error);

const app = new Koa();

app.on('error', (err, ctx) => {
  console.error(err);
});


app
  .use(
    logger((str, args) => {
      console.log(str, args);
    }),
  )
  .use(
    bodyParser({
      extendTypes: {
        json: ['text/plain'],
      },
      limit: '5mb',

      onerror: (err, ctx) => {
        console.log(err);
        ctx.throw('body parse error', 422);
      },
    }),
  );

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
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

app.use(cors());

routing(app);

app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`),
);

export default app;
