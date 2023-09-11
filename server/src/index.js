const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
var cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 4000;
const MODE = process.env.MODE || "development";

if (MODE === "production") {
    app.use(express.static(path.join(__dirname, "../../client/dist/")));
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/triangulation", (req, res) => {
    const { radius, segmentNumber } = req.query;
    const basePoints = [];

    for (let pointIndex = 0; pointIndex < segmentNumber; pointIndex++) {
        const coordinateX =
            radius * Math.cos((2 * Math.PI * pointIndex) / segmentNumber);
        const coordinateY =
            radius * Math.sin((2 * Math.PI * pointIndex) / segmentNumber);
        const coordinateZ = 0;
        basePoints.push(coordinateX, coordinateY, coordinateZ);
    }

    res.send(basePoints);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
