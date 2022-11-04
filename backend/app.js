// const express = require("express");
// const app = express();
  
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
  
// const PORT = process.env.PORT || 8080;
  
// app.listen(PORT, console.log(`Server started on port ${PORT}`));

const express = require("express");
const path = require('path');

const app = express();

// app.post("/post", (req, res) => {
// console.log("Connected to React");
// res.redirect("/");
// });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.use(express.static('../public'))

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
