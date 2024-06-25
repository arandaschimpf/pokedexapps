const express = require('express');
const app = express();

app.use(express.static('src'))

app.listen(3000, () => {
  console.log('Server is running on http://localhnpmost:3000');
});