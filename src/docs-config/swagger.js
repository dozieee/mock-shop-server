import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Mock Shop API',
      version: '1.0.0',
      description: 'REST API Documentation for Mock Shop application',
      contact: {
        name: 'Akinlua Bolamigbe',
        email: 'bolamigbeakinlua@gmail.com',
      },
      server: ['http://localhost:3000'],
    },
  },
  // the path where the docs are located
  apis: ['./docs/**/*.yml'],
};

// swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// the docs endpoint config
const endPointSetup = {
  path: '/mock-shop-api-docs',
  handlers: [swaggerUi.serve, swaggerUi.setup(swaggerDocs)],
};

export default endPointSetup;
