import * as THREE from "three";

export const createScene = (width, height, element) => {
    const renderer = new THREE.WebGLRenderer({
        alpha: false,
        powerPreference: "high-performance",
    });
    renderer.setSize(width, height);

    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.y = 6;
    camera.position.z = 1;
    camera.rotation.x = -Math.PI / 2;
    camera.rotation.z = -Math.PI;
    // camera.lookAt(0, 0, 0);

    return {
        renderer,
        scene,
        camera,
    };
};
