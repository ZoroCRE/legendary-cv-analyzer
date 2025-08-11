import { Request } from 'express';
  import { FileFilterCallback } from 'multer';
  import { File } from 'multer';

  export function validateFile(req: Request, file: File, cb: FileFilterCallback) {
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF, Docx, PNG, or JPEG files are allowed'), false);
    }

    cb(null, true);
  }
