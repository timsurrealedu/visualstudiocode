// Import the FS (File System) module to read/write files (like stdio.h)
const fs = require('fs');
const path = require('path');

// Path to our JSON file
const dataPath = path.join(__dirname, '../data/data.json');

// Helper to read data (Concept: Helper function)
const getData = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

// 1. Controller to Show the Home Page (Form)
const getHome = (req, res) => {
    // Sending a simple HTML form string
    res.send(`
        <h1>C-Coder's Snippet Vault</h1>
        <p>Save your favorite C code logic here.</p>
        <form action="/api/snippet" method="POST">
            <input type="text" name="title" placeholder="Snippet Title" required /><br/>
            <textarea name="snippet" placeholder="Paste code here" required></textarea><br/>
            <button type="submit">Save Snippet</button>
        </form>
        <br/>
        <a href="/api/snippets">View All Snippets</a>
    `);
};

// 2. Controller to Handle Form Input (POST) 
const createSnippet = (req, res) => {
    const currentData = getData();
    const newSnippet = {
        id: currentData.length + 1, // Simple ID generation
        title: req.body.title,      // Data from the form input
        snippet: req.body.snippet
    };

    // Array Method: push (adding to the list)
    currentData.push(newSnippet);

    // Writing back to the file
    fs.writeFileSync(dataPath, JSON.stringify(currentData, null, 2));

    res.redirect('/api/snippets'); // Go to the list page after saving
};

// 3. Controller to View Data (GET) 
const getAllSnippets = (req, res) => {
    const data = getData();
    
    // Using Array Method .map() to transform data into HTML list items
    // This satisfies the requirement to use array methods 
    const listItems = data.map(item => `
        <li>
            <strong>${item.title}</strong>
            <pre>${item.snippet}</pre>
        </li>
    `).join('');

    res.send(`
        <h2>All Saved Snippets</h2>
        <ul>${listItems}</ul>
        <a href="/">Back to Home</a>
    `);
};

module.exports = { getHome, createSnippet, getAllSnippets };