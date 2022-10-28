import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const root = express.Router();

// ^/$|/index(.html)? ====>>>>> Means that in the route we must either have a '/' or '/index.html' but, the .html extension can be omitted
root.get('^/$|/index(.html)?', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

root.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

root.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/new-page.html');
});

export default root;
