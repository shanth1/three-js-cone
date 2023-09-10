import "./styles.scss";

import { createScene } from "./model/scene";
import { getMesh } from "./model/mesh";
import { meshAnimation } from "./model/animation";

const rootElement = document.getElementById("three-js");
const parentElement = rootElement.parentElement;
const { offsetWidth, offsetHeight } = parentElement;

const isAnimated = true;

const { renderer, camera, scene } = createScene(
    offsetWidth,
    offsetHeight,
    rootElement,
);

const mesh = getMesh();
scene.add(mesh);

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
