// Routers
import productRouter from './product-router';
import cartRouter from './cart-router';
// not-found
import notFound from '../controllers/not-found';
import makeCallBack from '../express-callback';
import swaggerEndPointSetup from '../../docs/swagger';
// sawgger endpointsetup
const { path, handlers } = swaggerEndPointSetup;

// api root
const apiRoot = process.env.API_ROOT_V1;

export default function(app) {
  // the docs endpoint
  app.use(`${apiRoot}${path}`, handlers);
  app.use(`${apiRoot}/product`, productRouter);
  app.use(`${apiRoot}/cart`, cartRouter);
  // the root endpoint
  app.use(`${apiRoot}`, (req, res) => {
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
