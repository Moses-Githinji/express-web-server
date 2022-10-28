import express from 'express';
import path from 'path';
import cors from 'cors';
import { logger } from './middleware/logEvents.js';
import { errorHandler } from './middleware/errorHandler.js';
import router from './routes/subdir.js';
import root from './routes/root.js';

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3500;

// custom middleware for logging events
app.use(logger);

// CORS - Cross Origin Resource Sharing
const whitelist = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5500',
  'http://localhost:3500',
];
const corsOptions = {
  origin: (reqOrigin, callback) => {
    if (whitelist.indexOf(reqOrigin) != -1 || !reqOrigin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built in middleware to handle url encoded data
// in other words, form data
// 'content-type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/', root);

app.use('/subdir', router);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found!' });
  } else {
    res.type('txt').send('404 Not Found!');
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
