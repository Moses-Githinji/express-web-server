import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const __dirname = path.resolve();

export const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'));
    }
    // another test
    await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
  } catch (error) {
    console.error(error);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.path}, ${req.method}`);
  next();
};
