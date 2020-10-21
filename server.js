// DEPENDENCIES
const express = require("express");

// SET UP EXPRESS APP
const app = express();
var PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================

// ROUTES

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "nodes.html"));
});