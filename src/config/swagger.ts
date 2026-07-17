import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Event Booking API",
      version: "1.0.0",
      description: "API documentation for Event Booking Application",
    },

    servers: [
      {
        url: "http://localhost:8000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    
  },

  apis: [
    "./swagger/*.yaml"
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;