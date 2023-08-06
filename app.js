require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productRouter = require('./routes/products');

const notFound = require('./middleware/not-found');
const errors = require('./middleware/error-handler');
app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('api/v1/products', productRouter);

app.use(notFound);
app.use(errors);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
