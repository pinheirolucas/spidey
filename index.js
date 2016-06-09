const express = require("express");


const app = express();

app.use(express.static(__dirname + "/static"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (request, response) => {
    response.render("pages/index");
});

app.listen(process.env.PORT, () => {
    console.log("Spidey is running on port", process.env.PORT);
});
