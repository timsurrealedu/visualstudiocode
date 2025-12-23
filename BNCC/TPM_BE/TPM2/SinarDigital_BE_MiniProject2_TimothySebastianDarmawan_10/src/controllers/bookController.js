const prisma = require('../utils/prismaClient');
const fs = require('fs');
const path = require('path');

// READ (Get all books) [cite: 15]
exports.getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({ include: { category: true } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE (Add book + Image) [cite: 14, 20]
exports.createBook = async (req, res) => {
  try {
    const { title, description, categoryId } = req.body;
    // Check if file was uploaded
    const imageUrl = req.file ? req.file.filename : null; 

    const book = await prisma.book.create({
      data: {
        title,
        description,
        categoryId: parseInt(categoryId),
        imageUrl: imageUrl // Store path/name in DB [cite: 22]
      }
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE (Update data + Replace Image) [cite: 17, 24]
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    // Find existing book
    const existingBook = await prisma.book.findUnique({ where: { id: parseInt(id) } });
    if (!existingBook) return res.status(404).json({ msg: 'Book not found' });

    let imageUrl = existingBook.imageUrl;

    // If new file uploaded, delete old one and update path
    if (req.file) {
      if (existingBook.imageUrl) {
        const oldPath = path.join(__dirname, '../uploads/', existingBook.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath); // Delete old file
      }
      imageUrl = req.file.filename;
    }

    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, description, imageUrl }
    });

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE (Remove data + Remove Image) [cite: 18, 25]
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({ where: { id: parseInt(id) } });

    if (!book) return res.status(404).json({ msg: 'Book not found' });

    // Remove file from local disk 
    if (book.imageUrl) {
      const filePath = path.join(__dirname, '../uploads/', book.imageUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await prisma.book.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};