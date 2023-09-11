import "./styles.scss";

import { createScene } from "./model/scene";
import { meshAnimation } from "./model/animation";
import { addLight } from "./model/light";
import { getMesh } from "./model/mesh";

const rootElement = document.getElementById("three-js");
const parentElement = rootElement.parentElement;
const { offsetWidth, offsetHeight } = parentElement;

const isAnimated = true;

const { renderer, camera, scene } = createScene(
    offsetWidth,
    offsetHeight,
    rootElement,
);

const vertices = new Float32Array([
    0,
    0,
    3, // v0
    1,
    0,
    0, // v1
    0,
    1,
    0, // v2
    -1,
    0,
    0, // v3
]);

const indices = [0, 1, 2, 0, 2, 3];

const mesh = getMesh(vertices, indices);
scene.add(mesh);

addLight(scene);

renderer.render(scene, camera);
const animate = () => {
    requestAnimationFrame(animate);
    meshAnimation(mesh);
    renderer.render(scene, camera);
};

if (isAnimated) {
    animate();
}

addEventListener("resize", () => {
    const { offsetWidth, offsetHeight } = parentElement;
    camera.aspect = offsetWidth / offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(offsetWidth, offsetHeight);
});
