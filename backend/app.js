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

app.post("/videos", (req, res) => {
console.log("Saving videos to database");
res.redirect("/");
});

// app.get("/videos", (req, res) => {
//   res.send("Get videos from front end");
// });

app.use(express.static('../public'))

// Route to the static minified React files in Build folder
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
