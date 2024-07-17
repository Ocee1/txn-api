import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Transaction API',
        description: 'A simple API to simulate simple transactions'
    },
    servers: [
        {
            url: 'http://localhost:4080',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/user.routes.ts', './routes/transaction.route.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);