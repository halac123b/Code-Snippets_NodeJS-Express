const hostname = "127.0.0.1";
const port = process.env.PORT || 8081;

const express = require("express");
const routes = require("./routes");
const sample = require("./routes/sample/sample");
const path = require("path")

const app = express();

// Set cấc value cho server
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Use middleware at specific path
app.use("/", routes);
app.use("/", sample);

// Link to folder css
app.use(express.static(path.join(__dirname, "sass")));

// Nếu path không vào đc middleware route thì hiện 404
app.use((request, response, next) => {
    response.render("pages/404", {title : "404"});
});

// Start server at specific port
app.listen(port, () => {
    console.log("Hello world");
});