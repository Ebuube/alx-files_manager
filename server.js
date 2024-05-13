const express = require('express');
const routes = require('./routes/index');

const PORT = process.env.PORT || 5000;
const app = express();

// User the routes defind in ./routes/index.js
app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

module.exports = app;
