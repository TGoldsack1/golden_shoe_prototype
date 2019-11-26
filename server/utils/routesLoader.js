import glob from 'glob';

export default function(dirname) {
  return new Promise((resolve, reject) => {
    const routes = [];
    glob(
      `${dirname}/*`,
      {
        ignore: '**/index.js',
      },
      (err, files) => {
        if (err) {
          return reject(err);
        }
        files.forEach(file => {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const route = require(file).default;
          routes.push(route);
        });
        return resolve(routes);
      },
    );
  });
}
