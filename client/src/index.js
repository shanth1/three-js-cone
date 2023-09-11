import "./styles.scss";

import axios from "axios";
import { SceneClass } from "./model/SceneClass";

const rootElement = document.getElementById("three-js");
const parentElement = rootElement.parentElement;
const { offsetWidth, offsetHeight } = parentElement;

const scene = new SceneClass(offsetWidth, offsetHeight, rootElement);
scene.addLight();
scene.start();

addEventListener("resize", () => {
    const { offsetWidth, offsetHeight } = parentElement;
    scene.updateScene(offsetWidth, offsetHeight);
});

const button = document.getElementById("sendButton");
button.onclick = () => {
    const height = 4;
    const radius = 2;
    const segmentNumber = 6;
    axios
        .get("http://localhost:4000/api/triangulation", {
            params: {
                height,
                radius,
                segmentNumber,
            },
        })
        .then((response) => {
            const basePoints = response.data;
            const vertices = new Float32Array([
                ...[0, 0, 0], // середина основания
                ...[0, 0, height], // вершина
                ...basePoints,
            ]);
            const indices = [];
            for (let i = 0; i < segmentNumber - 1; i++) {
                indices.push(0, i + 2, i + 3);
                indices.push(1, i + 2, i + 3);
            }
            indices.push(0, segmentNumber - 1 + 2, 2);
            indices.push(1, segmentNumber - 1 + 2, 2);
            scene.updateMesh(vertices, indices);
        })
        .catch((e) => console.error(e));
};
