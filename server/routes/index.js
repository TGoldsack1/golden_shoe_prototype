import routesLoader from '../utils/routesLoader';

export default function(app) {
  routesLoader(`${__dirname}`)
    // eslint-disable-next-line promise/always-return
    .then(files => {
      files.forEach(router => {
        app.use(router.middleware());
      });
    })
    .catch(e => {
      console.error(e);
    });
}
