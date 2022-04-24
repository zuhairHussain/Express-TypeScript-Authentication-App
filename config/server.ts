import express, {Express, Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import compression from 'compression';
import setRoutes from '../routes';
import ErrorHandler, {CustomErrorRequestHandler} from '../services/ErrorHandlerService';
dotenv.config();

var server: Express = express();

server.use(morgan('dev'));
server.use(compression());
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());
server.use(express.json());

setRoutes(server);

/* Centeralize error handler middleware */
server.use((err: CustomErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler.handleError(err, res);
});

export default server;
