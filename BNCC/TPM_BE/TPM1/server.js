const app = require('./src/app');
const config = require('./src/config/app.config');

// Start the server (The infinite loop waiting for connections)
app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});