const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle requests to non-static routes by serving index.html (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Set the port to listen to the `PORT` environment variable or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
