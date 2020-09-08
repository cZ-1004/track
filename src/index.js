require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

// const mongoURI = 'mongodb+srv://cZ:112112@brandon.m5ylg.mongodb.net/<dbname>?retryWrites=true&w=majority';

const mongoURI = 'mongodb+srv://p00gz:JyKbVf7l6ATUk54h@emaily-uwsj6.mongodb.net/test?retryWrites=true';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req,res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
