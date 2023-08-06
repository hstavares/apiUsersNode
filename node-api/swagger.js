const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API Node.js',
      version: '1.0.0',
    },
  },
  apis: ['./src/controllers/*.js'], // Caminho para os seus controladores
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
