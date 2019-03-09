const mongoose = require('mongoose');
const express = require("express");
const users = require("./routes/api/users");
const listings = require("./routes/api/listings");
const bodyParser = require("body-parser");
const db = require('./config/keys').mongoURI;
const app = express();

mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
app.get('/', (req, res) => res.send('Hello!'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/listings", listings);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

