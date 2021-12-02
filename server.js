import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoute from './routes/userRoutes.js';
import postRoute from './routes/postRoutes.js';
import categoryRoute from './routes/categoryRoutes.js';
const app = express();

dotenv.config();
connectDB();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/users/', userRoute);
app.use('/api/posts/', postRoute);
app.use('/api/category/', categoryRoute);

// -------deployment code---------------------------------//

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running..');
  });
}

// -------deployment code---------------------------------//

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`🔥🔥🔥🔥🔥Server running on PORT ${PORT} 🔥🔥🔥🔥🔥`)
);
