import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { PDFDocument } from 'pdf-lib';
export const pdfToolsRouter = Router();
/**
 * 1. POST /api/pdf-tools/merge
 * Merge multiple uploaded PDFs into a single PDF
 */
pdfToolsRouter.post('/merge', upload.array('files', 10), async (req, res, next) => {
    try {
        const files = req.files;
        if (!files || files.length < 2) {
            return res.status(400).json({ success: false, error: 'Please upload at least 2 PDF files to merge.' });
        }
        const mergedPdf = await PDFDocument.create();
        for (const file of files) {
            const pdf = await PDFDocument.load(file.buffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        const mergedPdfBytes = await mergedPdf.save();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="beemim_merged.pdf"');
        return res.send(Buffer.from(mergedPdfBytes));
    }
    catch (error) {
        next(error);
    }
});
/**
 * 2. POST /api/pdf-tools/split
 * Extract specific pages from a PDF
 */
pdfToolsRouter.post('/split', upload.single('file'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Please upload a PDF file.' });
        }
        const { startPage = '1', endPage } = req.body;
        const srcDoc = await PDFDocument.load(req.file.buffer);
        const totalPages = srcDoc.getPageCount();
        const start = Math.max(1, parseInt(startPage, 10));
        const end = Math.min(totalPages, endPage ? parseInt(endPage, 10) : totalPages);
        const newDoc = await PDFDocument.create();
        const pageIndices = [];
        for (let i = start - 1; i < end; i++) {
            pageIndices.push(i);
        }
        const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
        copiedPages.forEach((page) => newDoc.addPage(page));
        const pdfBytes = await newDoc.save();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="beemim_pages_${start}_to_${end}.pdf"`);
        return res.send(Buffer.from(pdfBytes));
    }
    catch (error) {
        next(error);
    }
});
/**
 * 3. POST /api/pdf-tools/image-to-pdf
 * Convert uploaded images (PNG/JPEG) into a formatted PDF
 */
pdfToolsRouter.post('/image-to-pdf', upload.array('images', 20), async (req, res, next) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, error: 'Please upload at least one image.' });
        }
        const doc = await PDFDocument.create();
        for (const file of files) {
            let image;
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
                image = await doc.embedJpg(file.buffer);
            }
            else if (file.mimetype === 'image/png') {
                image = await doc.embedPng(file.buffer);
            }
            else {
                continue;
            }
            const page = doc.addPage([image.width, image.height]);
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height,
            });
        }
        const pdfBytes = await doc.save();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="beemim_converted.pdf"');
        return res.send(Buffer.from(pdfBytes));
    }
    catch (error) {
        next(error);
    }
});
