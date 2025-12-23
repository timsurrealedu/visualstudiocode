const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for images so they can be viewed [cite: 30]
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

// Use Routes
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});