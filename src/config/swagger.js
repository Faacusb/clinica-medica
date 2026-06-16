import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Clínica Médica",
            version: "1.0.0",
            description: "Documentación de la API de Clínica Médica"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: [
        "./src/routes/v1/*.js"
    ]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;