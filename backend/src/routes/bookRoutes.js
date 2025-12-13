import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { authorize, protect } from '../middleware/auth.js';
import { createBook, deleteBook, getBook, listBooks, updateBook } from '../controllers/bookController.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer destination should match the static file serving path in server.js
// server.js serves from: path.join(__dirname, '..', 'uploads') where __dirname is backend/src
// So we need: backend/src/../uploads = backend/uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'uploads'),
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

