// DEPENDENCIES
const express = require("express");
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");

// SET UP EXPRESS APP
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// ================================================================





app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})