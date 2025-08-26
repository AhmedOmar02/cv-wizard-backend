"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
exports.swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation for my project',
    },
    servers: [
        {
            url: 'http://localhost:3000', // adjust for your env
        },
    ],
    paths: {
        '/auth/register': {
            post: {
                summary: 'Register a new user',
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: {
                                        type: 'string',
                                        format: 'email',
                                        example: 'test@example.com',
                                    },
                                    password: {
                                        type: 'string',
                                        example: 'Passw0rd!',
                                    },
                                    firstName: { type: 'string', example: 'John' },
                                    lastName: { type: 'string', example: 'Doe' },
                                    phoneNumber: { type: 'string', example: '+1234567890' },
                                    city: { type: 'string', example: 'New York' },
                                    country: { type: 'string', example: 'USA' },
                                    linkedinUrl: {
                                        type: 'string',
                                        example: 'https://linkedin.com/in/johndoe',
                                    },
                                    role: {
                                        type: 'string',
                                        enum: ['regular', 'admin'],
                                        example: 'regular',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'User registered successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        message: {
                                            type: 'string',
                                            example: 'Registered successfully, a verification link has been sent to test@example.com',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Email already registered',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'fail' },
                                        message: {
                                            type: 'string',
                                            example: 'Email test@example.com is already registered',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
