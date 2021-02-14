import { Request } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';
import { v4 } from 'uuid';

export const getMulterStorage = (folder: string) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname));
  }
});

export const imageFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
