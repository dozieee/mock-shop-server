// Routers
import eventRouter from './event-router';
import authRouter from './auth-router';
import payRouter from './pay-router';
// not-found
import notFound from '../controllers/not-found';
import makeCallBack from '../express-callback';
import swaggerEndPointSetup from '../docs-config/swagger';
// sawgger endpointsetup
const { path, handlers } = swaggerEndPointSetup;

// api root
const apiRoot = process.env.API_ROOT_V1;

export default function(app) {
  // the docs endpoint
  app.use(`${apiRoot}${path}`, handlers);
  // the product edpoint
  app.use(`${apiRoot}/event`, eventRouter);
  // the auth endpoint
  app.use(`${apiRoot}/auth`, authRouter);
  // payment
  app.use(`${apiRoot}/payment`, payRouter);
  // the cart endpoint
  // the root endpoint
  app.get(`${apiRoot}`, (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        message: 'This is Mock shop',
        info: 'this is the api root v1',
      },
    });
  });
  // the not-found end point
  app.use(makeCallBack(notFound));
}
