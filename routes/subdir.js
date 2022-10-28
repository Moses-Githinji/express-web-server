import express from 'express';
import path from 'path';

const __dirname = path.resolve();

const router = express.Router();

// ^/$|/index(.html)? ====>>>>> Means that in the route we must either have a '/' or '/index.html' but, the .html extension can be omitted
router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'subdir', 'index.html'));
});

router.get('/test(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'subdir', 'test.html'));
});

export default router;
