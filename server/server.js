const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')

const cookieParser = require("cookie-parser");

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/budgets', require('./routes/budgets'));
app.use('/api/todos', require('./routes/todos'));
app.use('/api/journals', require('./routes/journals'));


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});