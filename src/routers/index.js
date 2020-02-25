// Routers

// not-found
import notFound from '../controllers/not-found';
import makeCallBack from '../express-callback';

// api root
// const apiRoot = process.env.API_ROOT;

export default function(app) {
  // * app.use(`${apiRoot}/endpoint`, Router);
  app.use(makeCallBack(notFound));
}
