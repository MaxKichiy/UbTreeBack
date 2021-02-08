require('dotenv').config();
const { json } = require('express');
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const jwtAuth = require('./middleware');
const uri = `mongodb+srv://${process.env.MON_USER}:${process.env.MON_PASS}@cluster0.hvfma.mongodb.net/urbantree?retryWrites=true&w=majority`;

const routes = require('./routes/api');
const authRoutes = require('./routes/auth');
const app = express();

app.use(express.json());

app.use(cors());
app.use('/login', jwtAuth, (req, res, next) => {
  res.send(req.user);
  next();
});

app.use('/auth', authRoutes);
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log('🚀 ~ file: index.js ~ line 16 ~ app.use ~ err', err);
  res.status(422).send(err.message);
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then((result) => {
    app.listen(8000, () => {
      console.log('server is running');
    });
  });
