import fs from 'fs';
import path from 'path';

export const saveUploadedFile = (file: Express.Multer.File, uploadDir: string) => {
  const filePath = path.join(uploadDir, file.originalname);
  fs.renameSync(file.path, filePath);
  return filePath;
};

export const deleteFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
