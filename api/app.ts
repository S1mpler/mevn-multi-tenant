require('dotenv').config();

import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';

import { DatabaseConnection } from './config/database';
import { routes } from './router/router';

const app = express();

// Set global middleware
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  (
    err: Error & { status: number },
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): void => {
    response.status(err.status || 500);
    response.json({
      error: 'Server error',
    });
  }
);

// Establish routes
app.use('/', routes());

// Connect to database
new DatabaseConnection().connect({
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
});

// Start the server
const server: http.Server = app.listen(process.env.PORT || 3000);

export { server };
