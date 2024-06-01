const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library System API',
            version: '1.0.0',
            description: 'API documentation for Library System',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        security: [{ bearerAuth: [] }], // Apply JWT token authentication globally
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./docs/*.yaml'], // Include all YAML files in the docs directory
};

const specs = swaggerJsdoc(options);

module.exports = specs;
