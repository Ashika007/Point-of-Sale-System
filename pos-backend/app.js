require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const config = require('./config/config');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const PORT = config.port;
connectDB();

//middlewares
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);
app.use(express.json()); // to parse JSON bodies
app.use(cookieParser());

app.get('/', (req, res) => {
  // const err = createHttpError(404, 'Something went wrong');
  // throw err;
  res.json('Welcome to the POS Backend!');
});

//Endpoints
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/table', require('./routes/tableRoute'));
// app.use('/api/payment', require('./routes/paymentRoute'));

//Global error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`POS Backend is running on port ${PORT}`);
});
