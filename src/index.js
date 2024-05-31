const express = require('express');
const connectDB = require('./config/database');
const libraryRoutes = require('./routes/libraryRoutes');

connectDB();

const app = express();
app.use(express.json());

app.use('/library', libraryRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Library system server is running on port ${port}`);
});
