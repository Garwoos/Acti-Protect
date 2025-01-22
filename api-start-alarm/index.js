const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

const apiRoutes = require('./apiRoutes');
app.use('/api', apiRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});