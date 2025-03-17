var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var connection = require("./database");  
var authRoutes = require("./routes/auth");
var taskRoutes = require("./routes/tasks");

var app = express();
app.use(cors());
app.use(bodyParser.json());

// Use authentication routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(3000, function () {
    console.log("App Listening on port 3000");
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected!");
    });
});
