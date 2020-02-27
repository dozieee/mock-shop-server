// Routers

// not-found
import notFound from '../controllers/not-found';
import makeCallBack from '../express-callback';
import swaggerEndPointSetup from '../../docs/swagger';
// sawgger endpointsetup
const { path, handlers } = swaggerEndPointSetup;

// api root
const apiRoot = process.env.API_ROOT;

export default function(app) {
  // the docs endpoint
  app.use(`${apiRoot}${path}`, handlers);
  // the not-found end point
  app.use(makeCallBack(notFound));
}
