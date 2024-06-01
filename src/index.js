require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const specs = require('../swaggerConfig');
const chalk = require("chalk");


connectDB();

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/borrowings', borrowingRoutes);

const port = process.env.PORT_APP || 3000;
app.listen(port, () => {
    console.log(`Library system server is running on port ${port}\n`);
    if (process.env.NODE_ENV === 'development') {
        console.log(chalk.yellow.bold.underline(`Swagger UI available at http://localhost:${port}/api-docs\n`));
        console.log(chalk.green.bold.underline(`API available at http://localhost:${port}\n`));
        console.log(chalk.blue.bold(`You are in ${process.env.NODE_ENV} mode and can access the API without authentication\n`));
    }
});
