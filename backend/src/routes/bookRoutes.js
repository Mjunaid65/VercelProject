import express from 'express';
import multer from 'multer';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { authorize, protect } from '../middleware/auth.js';
import { createBook, deleteBook, getBook, listBooks, updateBook } from '../controllers/bookController.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer destination should match the static file serving path in server.js
// server.js serves from: path.join(__dirname, '..', 'uploads') where __dirname is backend/src
// So we need: backend/src/../uploads = backend/uploads
// Pick a writable uploads directory. On Vercel the project bundle is read-only
// so use the system temp directory there. Allow override via UPLOADS_DIR env var.
const uploadsDir = process.env.UPLOADS_DIR || (process.env.VERCEL === '1' ? os.tmpdir() : path.join(__dirname, '..', '..', 'uploads'));

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname}`;
    cb(null, unique);
  }
});
const upload = multer({ storage });

router.get('/', listBooks);
router.get('/:id', getBook);
router.post('/', protect, authorize('admin', 'librarian'), upload.single('cover'), createBook);
router.put('/:id', protect, authorize('admin', 'librarian'), upload.single('cover'), updateBook);
router.delete('/:id', protect, authorize('admin', 'librarian'), deleteBook);

export default router;

