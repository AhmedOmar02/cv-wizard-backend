import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRouter'; 
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRouter);


app.use(globalErrorHandler);

export default app;
