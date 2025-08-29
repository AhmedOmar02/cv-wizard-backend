import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRouter';
import globalErrorHandler from './middlewares/globalErrorHandler';
import httpLog from './middlewares/httpLog';
import swaggerUI from 'swagger-ui-express';
import docs from './docs/swagger.json';

const app = express();

app.use(httpLog);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRouter);


app.use(globalErrorHandler);

export default app;
