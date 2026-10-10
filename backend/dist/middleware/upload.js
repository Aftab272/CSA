import multer from 'multer';
import { ENV } from '../config/env.js';
// Memory storage: Files reside in memory during request processing and are freed immediately after!
// Zero permanent files on server disk.
const storage = multer.memoryStorage();
export const upload = multer({
    storage,
    limits: {
        fileSize: ENV.MAX_FILE_SIZE_MB * 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'application/pdf',
            'text/plain',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed: Images, PDF, TXT.`));
        }
    },
});
