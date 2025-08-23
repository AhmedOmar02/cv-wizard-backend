import httpLog from './middlewares/httpLog';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { notFoundEndpoint } from './middlewares/notAllowedHandler';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

app.use(httpLog); // to log HTTP requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(helmet());


app.use(notFoundEndpoint); // handle requests to endpoints that are not implemented

// global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});

export default app;
