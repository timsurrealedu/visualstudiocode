const upload = require('../config/multer');
// 'image' is the key name expected in form-data
module.exports = upload.single('image');