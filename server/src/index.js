const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const MODE = process.env.MODE || "development";

if (MODE === "production") {
    app.use(express.static(path.join(__dirname, "../../client/dist/")));
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
