// Routers

// not-found
import notFound from '../controllers/not-found';
import makeCallBack from '../express-callback';
import swaggerEndPointSetup from '../../docs/swagger';

// api root
const apiRoot = process.env.API_ROOT;

export default function(app) {
  // the docs endpoint
  app.use(
    `${apiRoot}${swaggerEndPointSetup.path}`,
    swaggerEndPointSetup.handlers,
  );
  // the not-found end point
  app.use(makeCallBack(notFound));
}
