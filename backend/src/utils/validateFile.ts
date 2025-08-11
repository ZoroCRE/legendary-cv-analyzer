export function validateFile(req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) {
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