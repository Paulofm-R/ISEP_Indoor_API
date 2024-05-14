const options = {
    swaggerDefinition: {
        info: {
            description: 'API for TASSI project',
            title: "Indoor Map API",
            version: "1.0.0"
        },
        host: 'https://isep-indoor-api.onrender.com',
        basePath: '/',
        produces: ['application/json'],
        schemes: ['http'],
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                in: 'header',
                name: "Authorization",
                description: "Bearer Token",
            }
        }
    },
    basedir: __dirname,
    files: ['./routes/**/*.routes.js', './models/**/*.js']
};

module.exports = options;