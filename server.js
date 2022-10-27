import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3500;
// ^/$|/index(.html)? ====>>>>> Means that in the route we must either have a '/' or '/index.html' but, the .html extension can be omitted
app.get('^/$|/index(.html)?', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page.html');
});

// Route Handlers
app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log(`Attempted to load hello.html!!`);
    next();
  },
  (req, res) => {
    res.send('Hello World!!');
  }
);

app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
