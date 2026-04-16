const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'));
    }

    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(compression());

    app.get('/', (req, res) => {
      res.send('API is running...');
    });

    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);

    app.use(notFound);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
