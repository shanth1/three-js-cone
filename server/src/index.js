const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
var cors = require("cors");
const calculateBasePoints = require("./model");

app.use(cors());

const PORT = process.env.PORT || 4000;
const MODE = process.env.MODE || "development";

if (MODE === "production") {
    app.use(express.static(path.join(__dirname, "../../client/dist/")));
}

app.get("/api/triangulation", (req, res) => {
    const { radius, segmentNumber } = req.query;
    const basePoints = calculateBasePoints(radius, segmentNumber);
    res.send(basePoints);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
